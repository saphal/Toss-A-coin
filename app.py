from flask import Flask, render_template, request
import random

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Disable caching for development

@app.route('/')
def index():
    return render_template('index.html', result='', heads=0, tails=0, total=0)

@app.route('/flip')
def flip():
    result = random.choice(['head', 'tail'])
    heads = int(request.args.get('heads', 0)) + (1 if result == 'head' else 0)
    tails = int(request.args.get('tails', 0)) + (1 if result == 'tail' else 0)
    total = heads + tails
    message = "It's HEADS! Luck's on your side!" if result == 'head' else "It's TAILS! Try again or trust the toss."
    return render_template('index.html', result=result, message=message, heads=heads, tails=tails, total=total)
