const fs = require('fs');
const axios = require('axios')

const API_URL = 'https://www.dnd5eapi.co';

const endpoints = {
    classes: '/api/2014/classes',
    subclasses: '/api/2014/subclasses',
    races: '/api/2014/races',
    subraces: '/api/2014/subraces',
    skills: '/api/2014/skills',
    features: '/api/2014/features',
}

async function fetchData(endpoint) {
    const fullData = [];
    try {
        const list = await axios.get(API_URL + endpoint);
        const items = list.data.results;

        for (const item of items) {
            const res = await axios.get(API_URL + item.url);
            const data = res.data;

            if (Array.isArray(data.proficiency_choices)) {
                for (const choice of data.proficiency_choices) {
                    if (choice.desc && typeof choice.desc === 'string' && choice.desc.includes('Choose')) {
                        const match = choice.desc.match(/Choose.*from (.+)/i);
                        if (match) {
                            const rawSkillsString = match[1]
                                .replace(/\.$/, '')           // remove ending "."
                                .replace(/, and /g, ', ')      // replace ", and " first
                                .replace(/ and /g, ', ');      // then " and " anywhere else

                            const rawSkills = rawSkillsString
                                .split(',')                   // NOW split into array
                                .map(skill => skill.trim())    // NOW map each item
                                .filter(skill => skill.length > 0); // remove empties

                            choice.skills = rawSkills;
                        }
                    }
                }
            }
            fullData.push(data);
        }
    } catch (err) { console.error(`Failed to fetch ${endpoint}:`, err.message) }



    return fullData;
}

async function run() {
    for (const [key, endpoint] of Object.entries(endpoints)) {
        const data = await fetchData(endpoint);
        fs.writeFileSync(`./${key}.json`, JSON.stringify(data, null, 2))
        console.log(`Created ${key}.json`);
    }
}

run().catch(console.error)