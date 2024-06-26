# Waterra

Water quality is a critical issue that affects everyone, yet it can be overwhelming to understand the complexities of this topic. Our project is a sub-project of the [Ohneganos](https://www.ohneganos.com/) program, which is an indigenous water research program in McMaster University focused on indigenous and other local communities to help them easily access and understand water quality data.
By integrating and analyzing data from a time-series database and using the tools InfluxDB, Postman, FileZilla, we have created a website that is user-friendly and informative.  Through easy access to this information, we hope to increase awareness about the importance of water quality and empower individuals to take action in protecting and preserving our water resources.

## Preparations

### 1. Clone the GitHub Repository
- Clone this repo to a local folder on your device.

### 2. Connectivity
- Connect to McMaster Campus Wi-Fi or use McMaster VPN.

## Setup Steps

### SSH Remote Connection
In terminal, do the following:
1. Command: `ssh pi@dev.macwater.local.re-mote.tk -p 2222`
- Username: `pi`
- Password: `raspberry`
2. Navigate to server program location:
  - `cd Desktop/webserver`
  - `sudo ./main`
3. If the text “Starting server for testing HTTP GET POST...” is displayed, the backend is set up.

### Frontend Setup
1. Navigate to the frontend folder in your cloned repository.
2. Install Yarn.
3. Execute the following command in the frontend folder: `yarn build`.
4. Open the `index.html` file in the `dist` folder.
