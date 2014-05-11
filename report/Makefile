LFLAGS = -pdf -interaction=nonstopmode


all: clean setup
	cd dest && latexmk $(LFLAGS) report.tex
	cd dest && cp report.pdf ..

setup:
	mkdir dest
	cp report.tex dest
	cp sources.bib dest

clean:
	rm -rf dest
	rm -f report.pdf