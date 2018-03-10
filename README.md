# WolfPool

UberPOOL and LyftLine are very efficient and affordable for travelling short distances. However, for suburban areas and a majority of metropolitan cities this option is not available. This is mainly due to low number of people travelling on the same route. The connectivity and frequency of public transportation is limited in these areas. In addition to these issues, there are a lot of difficulties to communicate and plan the rides using social media platforms such as Facebook and Whatsapp. To tackle the problems mentioned above, we have devised WolfPool as a service that specifically targets to enhance communication and convenience in planning of rides.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them. This software/system works best with Linux/MacOS. The only difference with Windows based systems is the steps involved in installation might be a bit different.

Node.js
MongoDB
Basic text editor like Atom, Notepad++ or even VIM/EMACS if you are into those :P

### Installing

This is a step by step series about how to get a development env running

STEP 1: Download and install Node.js from [here](https://nodejs.org/en/download/package-manager/). Once you complete the installation open a terminal window (Command Prompt for windows) and type the command 'node'. If you have successfully installed you will see a prompt like this.

![NodeJS working](/readme_files/nodejs.png)

STEP 2: Download and install MongoDB from [here](https://www.mongodb.com/download-center#community) and install it like any other software package. Once you are done with the installation, open a terminal and type the command 'mongo'. If you have successfully installed you will see a prompt like this.

![MongoDB working](/readme_files/mongo.png)

STEP 3: [Optional] If you are the kinda guy who doest not like to manage a database using a terminal or command prompt you can install [Studio 3T](https://studio3t.com/)

STEP 4: Clone the repository in appropriate directory and change the current working directory to 'wolfpool' (the repository folder)

```
git clone https://github.com/CJ8664/wolfpool.git
cd wolfpool
```

STEP 5: [NOTE: Please be patient] Now we have to install all the dependencies that are mentioned in the package.json file. If you are not sure what a package.json file please check this [url](http://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/). Understanding this is important because unless all the dependencies mentioned in this are resolved the web application will not start.

Command to install the dependencies [Works both on a terminal or cmd prompt]

```
npm install --save
```

STEP 6: With this the basic website is setup, ironically nothing will work because of the two APIs (Google Maps API and Mailjet API) and other code changes.

* **Google Maps API** - Please setup a Google Cloud account and get an API key following the neat documentation provided [here](https://developers.google.com/maps/documentation/javascript/get-api-key). Replace this key in the file views/partials/head.handlebars, line 17. This should enable Google Maps and its functionalities on localhost for development and debugging.

  **NOTE: Once you deploy the app on any online platform, please restrict the access to the Google services by limiting key access, more information [here](https://developers.google.com/maps/documentation/javascript/get-api-key#standard-auth)**

* **Mailjet** - This is a third party service that allows us to send emails, which is used heavily in this application. Please create an account from this [site](https://www.mailjet.com). Once the account is verified you can get the keys from this [page](https://app.mailjet.com/transactional). Export or set the environment variables for the API. For windows follow (this)[https://superuser.com/questions/79612/setting-and-getting-windows-environment-variables-from-the-command-prompt], for linux/MacOS run the bellow commands before running STEP 5.

```
export MJ_PUBLIC_KEY="Your Public key"
export MJ_PRIVATE_KEY="Your Private key"
```

* Open the file controllers/UserController.js and modify the hostname in line 31 that forms the hostname part of the verification link.


STEP 6: If all the above steps are completed successfully then you can start the bare minimum web application host **[Few of the essential features on work online when hosted on a cloud service provider like Amazon Web Services]**

* Run the following Command and open localhost on a browser

```
node app.js
>>> Output on console will be
'Express started on http://localhost:3000 press Ctrl-C to terminate'
```

## Amazon Web Serivces Deployment

## HTTPS Certificate installation

## Google Analytics Setup

## Authors

* **Chirag Jain** - *er.chiragjain92@gmail.com* - [github](http://github.com/CJ8664)
* **Ankit Jain** - *er.chiragjain92@gmail.com* - [github](http://github.com/CJ8664)
* **Nirav Jain** - *er.chiragjain92@gmail.com* - [github](http://github.com/CJ8664)
* **Rishabh Jain** - *er.chiragjain92@gmail.com* - [github](http://github.com/CJ8664)
* **Pratik Jain** - *kumathpratik@gmail.com* - [github](http://github.com/pratikkumar-jain)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## More about the research and inspiration for the project

Reasearch #1 - [wolfpool-report1-group-f.pdf](/reports/wolfpool-report1-group-f.pdf)
