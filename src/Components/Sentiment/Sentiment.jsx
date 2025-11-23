import React  ,{ useState } from 'react'
import "./Sentiment.css"; 

const Sentiment = () => {

  const [text, setText] = useState('');
  const[Sentimentdata, setSentimentdata] = useState(null);
  

  const [erreur,setErreur] = useState("");

  const HundleAnalyse = async(event)=> {
     event.preventDefault();
     
    const token = localStorage.getItem("token");
    console.log('Token stoccé avec sucess',token)
    if (!token) {
      setErreur("Vous devez vous connecter d'abord");
      return; }

   try {
      
  
      const response = await fetch('http://localhost:8000/predict',
        {
        method: 'POST',
        body: JSON.stringify({ text: text }),
        headers: { 'Content-Type': 'application/json' ,
                    "Authorization": `Bearer ${token}`
                  },
        
        });
        const Sentiment_data = await response.json();
        console.log("Réponse du backend :", Sentiment_data);
        if (response.ok) {
          setSentimentdata(Sentiment_data);
        }
        else { setErreur(Sentiment_data.detail || "Erreur lors de l'analyse");}
          
     }
     catch (error) {
      console.error("Erreur lors de l'analyse du sentiment:", error);
      setErreur("Erreur serveur");
    
  };


  }
  return (
    <div className='sentiment-page'>
      
    <div className='sentiment-container'>
      <h1>Analyse de Sentiment</h1>
      <form className="sentiment-form" onSubmit={HundleAnalyse}>
        <textarea 
            className='sentiment-textarea'
            value={text}
            placeholder='Entrez votre texte ici...' 
            onChange={(e) => setText(e.target.value)}
            required> </textarea>
        <button className='sentiment-button' type="submit">Analyser le sentiment dans ce text</button>
      </form>

      </div>

      <div className='sentiment-result'>
        {Sentimentdata ? (
          <>
            <h3>Résultat de l'analyse :</h3>
            <p><strong>Sentiment :</strong> {Sentimentdata.sentiment}</p>
            <p><strong>Score :</strong> {Sentimentdata.score}</p>
          </>
        ) : (
          <p className="placeholder-text">Le résultat s'affichera ici après analyse.</p>
        )}
        {erreur && <p className="sentiment-error">{erreur}</p>}
      </div>
    </div>
  );
}

export default Sentiment