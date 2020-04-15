.PHONY : all clean

all : final/assisted_properties.csv

clean :
	rm -rf final/*

final/assisted_properties.csv : raw/doc.kml
	python processors/kml_to_csv.py $^ $@
