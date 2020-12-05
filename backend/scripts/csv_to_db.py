from agendapi.models import RegDonacion, Place, get_rut_digit
from csv import reader

# open file in read mode
with open('../Data/original/usm.csv', 'r') as read_obj:
    # pass the file object to reader() to get the reader object
    csv_reader = reader(read_obj, delimiter='\t')
    # Iterate over each row in the csv using reader object
    next(csv_reader)
    for row in csv_reader:
        # row variable is a list that represents a row in csv
        print(row)
        rut = row[0]
        full_rut = rut + '-' + str(get_rut_digit(rut))

        d, m, y = row[2].split('/')
        tfecha = [y, m, d]
        rfecha = "-".join(tfecha)
        rlugar = Place.objects.get(codigo="usm")  # lugar
        rrut = full_rut  # rut
        rnombre = rrut  # nombres
        RegDonacion(fecha=rfecha, lugar=rlugar,
                    rut=rrut, nombres=rnombre).save()
