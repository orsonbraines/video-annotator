import sys
import argparse

import db

parser = argparse.ArgumentParser()
parser.add_argument("dsn")
args = parser.parse_args()

db.init_conn(args.dsn)

db.init_conn(args.dsn)

line = input('url,name,length: ')

vals = line.split(',')

assert len(vals) == 3

db.create_video({'url': vals[0],
                 'name': vals[1],
                 'length': vals[2]})

print(db.get_videos())