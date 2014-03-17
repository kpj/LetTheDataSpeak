set -e
set -u

pdflatex -interaction=nonstopmode proposal.tex
biber proposal
pdflatex -interaction=nonstopmode proposal.tex