function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let input_url = document.getElementById('name').value

    console.log("::: Form Submitted :::")
    console.log(input_url);

    //Verify url
    if(Client.validURL(input_url)){
        errors.style.display = "none";

        let reqBody = {
            theText: input_url
        };
        fetch('/api', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(function(res) {
            document.querySelector('#polarity').innerHTML = res.polarity
            document.querySelector('#subjectivity').innerHTML = res.subjectivity
            document.querySelector('#polarity_confidence').innerHTML = res.polarity_confidence
            document.querySelector('#subjectivity_confidence').innerHTML = res.subjectivity_confidence
            console.log(res);
        })
    }else{
        // show error url message
        document.querySelector("#errors").innerHTML = "The URL:[" +input_url+"] is not valide. Please enter a valid url"
        errors.style.display = "block";
    }

    
}

export { handleSubmit }
