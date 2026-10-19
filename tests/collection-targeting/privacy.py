"""Public-demo content and embedded SQL-package regression checks."""
from pathlib import Path
import base64,io,json,re,unittest,zipfile

ROOT=Path(__file__).resolve().parents[2]
HTML=(ROOT/'TAHSILAT-HEDEFLEME-DEMO.html').read_text()
SQL=ROOT/'sql/collection-targeting'

class PublicDemoPrivacyTests(unittest.TestCase):
    def test_no_institutional_source_identifiers(self):
        content=HTML+'\n'+'\n'.join(p.read_text() for p in SQL.iterdir() if p.is_file())
        for pattern in [r'\bB\d{5}\b',r'\bVB\d{4,}\b',r'\b[A-Z]{2,}DWH\b',r'\bDW_[A-Z_0-9]+',r'\bVB\d{4,}\b']:
            self.assertIsNone(re.search(pattern,content,re.I),pattern)
    def test_original_storage_names_are_not_read(self):
        self.assertNotIn("'hedef.project'",HTML);self.assertNotIn("'hedef.persist'",HTML)
        self.assertNotIn("'takip_dagitim_'",HTML)
        self.assertIn('fintek.demo.targeting.v8.project',HTML)
    def test_demo_has_no_scenarios_or_user_audit(self):
        s=json.loads((ROOT/'examples/collection-targeting/demo-project.json').read_text())
        self.assertTrue(s['demo']);self.assertEqual(s['scenarios'],[]);self.assertEqual(s['audit'],[])
        for f in s['files']:
            for row in f['rows']:
                for key in ['SUBEKODU','TAKIPBIRIMKODU']:
                    if row.get(key):self.assertTrue(row[key].startswith('DEMO-'))
        self.assertEqual(len(next(f for f in s['files'] if f['role']=='branches')['rows']),12)
    def test_embedded_allocation_defaults_are_empty(self):
        template=re.search(r'<script type="text/plain" id="takip-template">([\s\S]*?)</script>',HTML)[1]
        self.assertIn('const originalAllStaff = [];',template)
        self.assertIn('const originalAllBranches = [];',template)
    def test_embedded_sql_is_exactly_the_reviewed_package(self):
        payload=re.search(r'const SQL_ZIP="([^"]+)"',HTML)[1]
        archive=zipfile.ZipFile(io.BytesIO(base64.b64decode(payload)))
        self.assertEqual(set(archive.namelist()),{p.name for p in SQL.iterdir() if p.is_file()})
        for name in archive.namelist():self.assertEqual(archive.read(name),(SQL/name).read_bytes())
    def test_no_external_runtime_resources_or_api_calls(self):
        self.assertIsNone(re.search(r'<(?:script|link|img)\b[^>]*\b(?:src|href)=["\']https?://',HTML,re.I))
        own=[m[2] for m in re.finditer(r'<script\b([^>]*)>([\s\S]*?)</script>',HTML)][2:]
        self.assertIsNone(re.search(r'\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon)\s*\(',''.join(own)))
        self.assertIn('PORTFÖY DEMOSU',HTML)

if __name__=='__main__':unittest.main(verbosity=2)
