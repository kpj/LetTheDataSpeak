import sys, re


if len(sys.argv) != 2:
	print('Usage: %s <file>' % sys.argv[0])
	sys.exit()

midi_map = {
	'e': 64,
	'd#': 63,
	'b': 59,
	'c': 60,
	'a': 57,
	'd': 62,
	'g': 67,
	'f': 65
}

dna_map = {
	0: 'A',
	1: 'G',
	2: 'T',
	3: 'C' 
}

def magic(i):
	return int((i - 21) * 63/87)

# no one needs horner!
def euclid(x, b):
	n = 0
	while x > b**n:
		n += 1
	n -= 1
	a = [-1 for i in range(n+1)]
	for i in range(n, -1, -1):
		a[i] = x // b**i
		x = x % b**i
	return reversed(a)

with open(sys.argv[1], 'r') as fd:
	notes = re.findall(r"[\w'#]+", fd.read())
	midi = [midi_map[n] for n in notes]
	base4 = [euclid(magic(m), 4) for m in midi]
	dna = ''.join([''.join([dna_map[i] for i in p]) for p in base4])

	print(' '.join(notes))
	print(dna)