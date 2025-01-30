import NewsAPI from 'newsapi';
const newsapi = new NewsAPI('0839a4ca5d3247f0af119d1e3053bca2');
import fetch from 'node-fetch';
export default{
    HírekGetController:async (req, res) => {
        try{
            const válasz =await newsapi.v2.everything({
                q: 'Formula 1',
                language: 'hu',
                sortBy: 'relevancy'
              })
            if(válasz.status === 'ok'){
                return res.status(200).json(válasz.articles);
            }
            else{
                return res.status(400).json({ error: true, message: "Hiba a hír lekérésénél!" });
            }
        }
        catch (error) {
            console.error('Hiba: ', error);
            return res.status(500).json({ error: true, message: "Hiba a hír lekérésénél!" });
        }
    },
    CsapatokGetController:async (req, res) => {
        try {
            const válasz = await fetch('http://ergast.com/api/f1/constructors.json?limit=1000');
            const válaszkettő=await fetch('http://ergast.com/api/f1/constructors.json?limit=1000&offset=101');
            const válaszhárom=await fetch('http://ergast.com/api/f1/constructors.json?limit=1000&offset=202');
            if (!válasz.ok||!válaszkettő.ok||!válaszhárom.ok) {
                return res.status(500).json({ error: true, message: "Nem sikerült lekérni az Api adatait" });
            }
            const d1 = await válasz.json();
            const d2 = await válaszkettő.json();
            const d3 = await válaszhárom.json();
            
            const csapatok = {
                első: d1.MRData.ConstructorTable.Constructors,
                második: d2.MRData.ConstructorTable.Constructors,
                harmadik: d3.MRData.ConstructorTable.Constructors
            }
            return res.status(200).json(csapatok);
        } catch (error) {
            console.error('Hiba: ', error);
            return res.status(500).json({ error: true, message: "Hiba a csapatok lekérésénél!" });
        }
    },
    VersenyzőkGetController:async (req, res) => {
        try {
            const válasz = await fetch('https://api.openf1.org/v1/drivers');
            if (!válasz.ok) {
                return res.status(500).json({ error: true, message: "Nem sikerült lekérni az Api adatait" });
            }
            res.status(200).json(await válasz.json());
        } catch (error) {
            console.error('Hiba: ', error);
            return res.status(500).json({ error: true, message: "Hiba a versenyző lekérésénél!" });
        }
    }
}