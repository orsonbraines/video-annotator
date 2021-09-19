import psycopg2
from psycopg2.extras import execute_values

conn = None

def init_conn(dsn):
    global conn
    conn = psycopg2.connect(dsn)
    conn.autocommit = True

def create_video(video):
    with conn.cursor() as cur:
        cur.execute('INSERT INTO video(video_url, video_name, video_length, thumbnail_url) VALUES (%s,%s,%s,%s) RETURNING id',
            (video['video_url'], video['name'], video['length'], video['thumbnail_url']))
        assert cur.rowcount == 1
        return str(cur.fetchone()[0])

def create_annotation(annotation):
    with conn.cursor() as cur:
        cur.execute('INSERT INTO annotation(video_id, ts, msg) VALUES (%s,%s,%s)',
            (annotation['video_id'], annotation['ts'], annotation['msg']))

def create_transcript(transcript):
    with conn.cursor() as cur:
        cur.execute('INSERT INTO transcript(video_id, ts, txt) VALUES (%s,%s,%s)',
            (transcript['video_id'], transcript['ts'], transcript['txt']))

def create_transcripts(transcripts):
    with conn.cursor() as cur:
        execute_values(cur, 'INSERT INTO transcript(video_id, ts, txt) VALUES %s', transcripts)

def get_videos():
    with conn.cursor() as cur:
        cur.execute('SELECT id, video_url, video_name, video_length, thumbnail_url FROM video')
        print(f'DEBUG: {cur.rowcount} videos fetched')
        return [{'id': str(r[0]), 'video_url': r[1], 'name': r[2], 'length': r[3], 'thumbnail_url': r[4]} for r in cur.fetchall()]

def get_video(id):
    with conn.cursor() as cur:
        cur.execute('SELECT id, video_url, video_name, video_length, thumbnail_url FROM video WHERE id=%s', (id,))
        if cur.rowcount == 1:
            r = cur.fetchone()
            vid = {'id': str(r[0]), 'video_url': r[1], 'name': r[2], 'length': r[3], 'thumbnail_url': r[4]}
            vid['annotations'] = get_annotations(vid['id'])
            vid['transcripts'] = get_transcripts(vid['id'])
            return vid

def delete_video(id):
    with conn.cursor() as cur:
        cur.execute('DELETE FROM annotation WHERE video_id=%s', (id,))
        cur.execute('DELETE FROM transcript WHERE video_id=%s', (id,))
        cur.execute('DELETE FROM video WHERE id=%s', (id,))

def get_annotations(video_id):
    with conn.cursor() as cur:
        cur.execute(""" SELECT id, video_id, ts, msg FROM annotation
                        WHERE video_id = %s
                        ORDER BY ts""", (video_id,))
        print(f'DEBUG: {cur.rowcount} annotations fetched for video {video_id}')
        return [{'id': str(r[0]), 'video_id': r[1], 'ts': r[2], 'msg': r[3]} for r in cur.fetchall()]

def get_transcripts(video_id):
    with conn.cursor() as cur:
        cur.execute(""" SELECT id, video_id, ts, txt FROM transcript
                        WHERE video_id = %s
                        ORDER BY ts""", (video_id,))
        print(f'DEBUG: {cur.rowcount} transcripts fetched for video {video_id}')
        return [{'id': str(r[0]), 'video_id': r[1], 'ts': r[2], 'txt': r[3]} for r in cur.fetchall()]

def edit_annotation(id, new_msg):
    with conn.cursor() as cur:
        cur.execute('UPDATE annotation SET msg=%s WHERE id=%s', (new_msg,id))

def delete_annotation(id):
    with conn.cursor() as cur:
        cur.execute('DELETE FROM annotation WHERE id=%s', (id,))