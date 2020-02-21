import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import CommentSection from './components/CommentSection/CommentSection'
import api from './api'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let [languageOptions, setLanguageOptions] = useState([])

  // get speak language options here
  useEffect(() => {
    api.Translate.getSpeakLanguages()
      .then(response => setLanguageOptions(response))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className="App">
      <header className="App-header display-2 bg-light mb-4">
        Translation Blog
      </header>
      <main>
        <h1 className="m-4 p-3 text-center bg-light"><a className="heading-link" href="https://rapidapi.com/blog/google-translate-api-tutorial/">How To Build Support for Language Translating In Web Forms (Google Translate API Tutorial) [JavaScript]</a></h1>
        <article>
          <Container fluid>
            <Row className="justify-content-center">
              <Col md="8">
                <p>We are back with yet another <a href="https://rapidapi.com/blog/category/tutorial/">tutorial</a> on Google Translate API. This time we are going to address the language personalization feature on the web with this API.</p>

                <p>As a non-native English speaker, if you come across a web form in English that you want to fill out and submit, it can be difficult to interpret the meaning of each form field. Using the Google Translate API, we can build language personalization features for web forms so that you can choose the language while filling out the form.</p>

                <p>If this sounds interesting, then follow along this blog post to build a demo web form with language translation capability, powered by RapidAPI. But first, a very brief introduction to Google Translate API.</p>
                --- Read More ---
                <CommentSection languages={languageOptions} />
              </Col>
            </Row>
          </Container>
        </article>
      </main>
    </div>
  );
}

export default App;
