import React, { useState } from 'react';
import "./Sentiment.css"; 

const Sentiment = () => {
  const [text, setText] = useState('');
  const [Sentimentdata, setSentimentdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [erreur, setErreur] = useState("");

  const HundleAnalyse = async (event) => {
    event.preventDefault();
    setSuccess(false);
    setLoading(true);
    setErreur("");

    const token = localStorage.getItem("token");
    console.log('Token stoccé avec succès', token);

    if (!token) {
      setErreur("Vous devez vous connecter d'abord");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: JSON.stringify({ text: text }),
        headers: { 
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });

      const Sentiment_data = await response.json();
      console.log("Réponse du backend :", Sentiment_data);

      if (response.ok) {
        setSentimentdata(Sentiment_data);
        setSuccess(true);
      } else {
        setErreur(Sentiment_data.detail || "Erreur lors de l'analyse");
      }

    } catch (error) {
      console.error("Erreur lors de l'analyse du sentiment:", error);
      setErreur("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

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
            required
          />
          <button className='sentiment-button' type="submit" disabled={loading}>
            {loading ? "Analyse en cours..." : "Analyser le sentiment"}
          </button>
        </form>
      </div>

      <div className='sentiment-result'>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            {erreur && <p className="sentiment-error">{erreur}</p>}

            {success && Sentimentdata ? (
              <>
                <h3>Résultat de l'analyse :</h3>
                <p><strong>Sentiment :</strong> {Sentimentdata.sentiment}</p>
                <p><strong>Score :</strong> {Sentimentdata.score}</p>
              </>
            ) : (
              !erreur && !success  && <p className="placeholder-text">Le résultat s'affichera ici après analyse.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Sentiment;
