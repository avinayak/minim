import json


def chunker(seq, size):
    return (seq[pos:pos + size] for pos in range(0, len(seq), size))

with open('gradients_raw.json') as f:
    data = f.read()
    gradient = {}
    for grad in data.split("\n\n"):
        name = grad.split("\n")[0].strip()[6:-2]
        # print(name)
        colors = grad.split("\n")[2:-1]
        # for c in colors:
        #     print("-->", c.strip())

        gradient[name] = {
            c.split(":")[0].strip(): c.split(":")[1].strip()  for c in colors
        }
        # print("------")
    print(json.dumps(gradient, indent=4))
