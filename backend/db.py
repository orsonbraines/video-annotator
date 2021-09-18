import psycopg2

conn = None

def init_conn(dsn):
    global conn
    conn = psycopg2.connect(dsn)
    conn.autocommit = True

def create_video(video):
    with conn.cursor() as cur:
        cur.execute('INSERT INTO video(video_url, video_name, video_length) VALUES (%s,%s,%s)',
            (video['url'], video['name'], video['length']))

def create_annotation(annotation):
    with conn.cursor() as cur:
        cur.execute('INSERT INTO annotation(video_id, ts, msg) VALUES (%s,%s,%s)',
            (annotation['video_id'], annotation['ts'], annotation['msg']))

def create_transcript(transcript):
    with conn.cursor() as cur:
        cur.execute('INSERT INTO transcript(video_id, ts, txt) VALUES (%s,%s,%s)',
            (transcript['video_id'], transcript['ts'], transcript['txt']))