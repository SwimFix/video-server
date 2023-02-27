function generateRandom() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(23).substring(2, 5);
}    

async function uploadFile() { 
    const fileInput = document.getElementById('fileToUpload');
    const file = fileInput.files[0];

    const token = 'ghp_ePhlGig0C8Ji'+'hcOtbRvwHz9LGNIidq47gKPh';
    const octokit = new window.Octokit({
        auth: token,
    });

    const repo = 'SwimFix/video-server';

    const path = 'file'+generateRandom()+'.txt';
    const content = await file.text();

    // Print ocktokit to see what methods are available
    console.log(octokit.rest);


    await octokit.rest.repos.createOrUpdateFileContents({
        owner: repo.split('/')[0],
        repo: repo.split('/')[1],
        path: path,
        message: 'Add new file',
        content: btoa(content),
        committer: {
            name: 'geraw (via GitHub API)',
            email: 'gera.weiss@gmail.com',
        },
    });

    alert('File uploaded successfully!');
}
