import csv
import click
from bs4 import BeautifulSoup

FOLDERS_TO_SEARCH = [
    'LIHTC',
    'Public Housing &amp; RAD',
    'HUD Multifamily'
]

def process_placemark(placemark):
    # For now, this is just grabbing addresses
    # We may want to save more data from the KML file later

    name = placemark.find('name').string

    address = ''
    address_fields = ['Project Address', 'Full Address', 'full_address']

    for address_field in address_fields:
        try:
            address = placemark.ExtendedData.find(
                "Data", {"name": address_field}
            ).value.string
        except AttributeError:
            pass

    placemark_dict = {
        'name': name,
        'address': address
    }
    return placemark_dict


@click.command()
@click.argument('input_file', type=click.File('r'))
@click.argument('output_file', type=click.File('w'))
def kml_to_csv(input_file, output_file):
    soup = BeautifulSoup(input_file.read(), 'xml')
    output_data = []

    for folder in soup.find_all('Folder'):
        if folder.find('name').string in FOLDERS_TO_SEARCH:
            for placemark in folder.find_all('Placemark'):
                new_row = process_placemark(placemark)
                output_data.append(new_row)

    keys = [k.lower() for k in output_data[0].keys()]
    writer = csv.DictWriter(output_file, fieldnames=keys)
    writer.writeheader()
    writer.writerows(output_data)

if __name__ == "__main__":
    kml_to_csv()
