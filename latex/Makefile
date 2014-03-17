all: clean setup
	cd dest && latexmk -pdf proposal.tex
	cd dest && cp proposal.pdf ..
setup:
	mkdir dest
	cp proposal.tex dest
	cp sources.bib dest

clean:
	rm -rf dest
	rm -f proposal.pdf