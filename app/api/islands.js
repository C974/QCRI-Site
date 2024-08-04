import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { islands } = req.query;

    if (islands === 'data') {
        const filePath = path.join(process.cwd(), 'data', 'num_islands.json');
        try {
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const islandsData = JSON.parse(jsonData);
            res.status(200).json(islandsData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to read islands data' });
        }
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
}
