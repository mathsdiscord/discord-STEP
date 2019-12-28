const BASE_URL = 'https://stepdatabase.maths.org/database/db'

class Question {
    constructor(year, paper, question) {
        this.year = year
        this.paper = paper
        this.question = question

        this.baseUrl = `${BASE_URL}/${this.year}/${this.year}-S${this.paper}-Q${this.question}`
    }

    toString() {
        const fullYear = (parseInt(this.year) < 50 ? '20' : '19') + this.year
        return `**STEP**: ${fullYear} S${this.paper} Q${this.question}`
    }

    toImage() {
        return `${this.baseUrl}.png`
    }

    toTex() {
        return `${this.baseUrl}.tex`
    }

    getPaper() {
        return `${BASE_URL}/${this.year}/${this.year}-S${this.paper}.pdf`
    }
}




module.exports = { Question }