import subprocess
import shutil
import re
import os

subprocess.run(['npm','run','build'], shell=True)

shutil.rmtree('../backend/static')
shutil.rmtree('../backend/templates')

os.mkdir('../backend/static')
os.mkdir('../backend/templates')

with open('dist/index.html','r') as f:
    with open('../backend/templates/index.html','w') as g:
        for line in f:
            g.write(re.sub('/assets','/static/assets', line))

for a,b,c in os.walk('dist'):
    if a[5:]:
        os.mkdir('../backend/static/' + a[5:])
    for i in c:
        shutil.copyfile(a + '/' + i, '../backend/static/' + (a[5:] + '/' if a[5:] else '') + i)
