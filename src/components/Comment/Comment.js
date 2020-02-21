import React, { useState } from 'react'  // import the useState function
import classes from './Comment.module.css'
import Select from 'react-select'

import api from '../../api' // import the api object

const Comment =(props) => {
    //
    // Add the needed variables to state
    //
    let [target, setTarget] = useState({value: 'en'})
    let [output, setOutput] = useState('')
    let [error, setError] = useState('')

    const translate = () => {
        // Clears URL
        setOutput('')

        // encodes original text comment
        const encodedEnglish = encodeURI(props.comment.comment)

        // translates english to target language
        api.Translate.translateToText(encodedEnglish, target.value)
        .then(response => {
            // encodes target language
            const encodedTarget = encodeURI(response)
            // Retrieves audio data in target languages
            api.Translate.textToSpeech(encodedTarget, target.value)
                .then(response => setOutput(response)) // sets URL
        })
        .catch(e => setError('Something went wrong...'))
    }

    return (
        <div className={classes.Comment}>
            <button className={classes.DeleteButton + " btn btn-sm btn-danger float-right"} onClick={() => props.delete(props.comment.owner_id)}>X</button>
            <p className="font-weight-bold">{props.comment.name ? props.comment.name : props.comment.owner_id}</p>
            <p>{props.comment.comment}</p>

            {/*  */}
            {/* If there is an output url show the audio player */}
            {/*  */}
            {output &&
                <div>
                    <div style={{textAlign: "center"}}>
                        <audio controls>
                            <source src={output} type="audio/wav" />
                        </audio>
                    </div>
                </div>
            }

            <div className={classes.TranslateContainer}>

                {/*  */}
                {/* Add an error tag if API call fails */}
                {/*  */}
                <p style={{color: 'red'}}>{error}</p>

                {/*  */}
                {/* Button that calls the tranlate function */}
                {/*  */}
                <button onClick={() => translate()} className={classes.TranslateButton + ' btn'}>Translate</button>

                {props.languages && 
                    <div>
                        <label htmlFor="languages"><small>Select Language</small></label>
                        <Select
                            className={classes.Select}
                            value={target}
                            name="languages"
                            onChange={(selectedOption) => setTarget(selectedOption)}
                            options={props.languages.map(lang => { return { value: lang, label: lang } })}
                            />
                    </div>}
                </div>
        </div>
    )
}

export default Comment