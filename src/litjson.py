import json

js = {}
with open('litclock.js','r', encoding="utf8") as f:
    for line in f.readlines():
        sp = line.split("|")
        dat = {'highlight':sp[1],'text':sp[2],'author':sp[4], 'book':sp[3]}
        if sp[0] in js:
            js[sp[0]].append(dat)
        else:
            js[sp[0]] = [dat]
dss = json.dumps(js)
fs = ""
for i in dss:
    if ord(i) <= 128:
        fs+=i
print(fs)