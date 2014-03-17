all: clean setup
	cd dest && latex proposal.tex
	cd dest && bibtex proposal.aux
	cd dest && pdflatex proposal.tex
	cd dest && cp proposal.pdf ..
setup:
	mkdir dest
	cp proposal.tex dest
	cp sources.bib dest

clean:
	rm -rf dest
	rm -f proposal.pdf