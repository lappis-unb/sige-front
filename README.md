# Sistema de Gestão Energética da Universidade de Brasília - SIGE

## About

The Energy Management System (Sistema de Gestão Energética SIGE-UnB) developed by Univerity of Brasilia (Brazil) in partnership with CEB (Companhia Energética de Brasília), is a web application developed to assist in the monitoring and management of Universidade de Brasília's power consumption and distribution.

The idea is to monitor, collect and display data of each campus power supply, allowing a much better comprehension of the usage patterns and energy quality received from the distribution station.

The system is divided into four main layers:

- the **web presentation layer**, which holds the front-end of the application, including the dashboard for researchers.
- the **mobile presentation layer**, which holds the PWA mobile version of the front-end of the application.
- the **master server** layer, which is responsible for all the data management, data processing, and database redundancy.
- the **slave server** layer is responsible for the communication with energy transductors and data collection.

This reposotory holds the source code for the **web presentation layer** layer.

## License

All SIGE source code is licensed under [GPL v3](https://gitlab.com/lappis-unb/projects/SMI/smi-front/-/blob/development/LICENSE)

## Installation

## Locally installing

### Environment Configuration

Before running the project, make sure to perform the necessary environment configurations.

1. Create a `.env` file in the project root directory.

2. Open the `.env.dev` file and copy its contents.

3. Paste the contents into the `.env` file you created.

4. Make sure to set the SIGE_MASTER_URL variable in the `.env` file to the URL where the Master backend is running.

**Note: Do not commit the `.env` file to version control. It is already added to the `.gitignore` file to ensure it remains local.**


### Install the dependencies

Instal Yarn using [this link](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable), and:

```bash
yarn install
```

### Serve the app in development mode

```bash
yarn start
```

### Lint the files

```bash
yarn lint
```

### Build the app for production

```bash
yarn build
```

## Using Docker

### Docker

First install Docker following the instructions according to your Operational System, [here](https://docs.docker.com/install/).

### Docker Compose

After installing Docker, you can install Docker-Compose, also according to your Operational System [here](https://docs.docker.com/compose/install/).

### Runnning SIGE Master

If you have already lifted up [SIGE Slave's API](https://gitlab.com/lappis-unb/projects/SMI/smi-slave). All you have to do is:

``` bash
sudo docker-compose up
```
If you haven't you must create the docker network needed for Master to connect. As:


``` bash
sudo docker network create smi-network
```

and you can lift up you Master environment with:

``` bash
sudo docker-compose up
```

And, that's it! You have SIGE up and running!


### Team

|        Member       |            E-mail            |     Contribution Period      |
|:-------------------:|:----------------------------:|:----------------------------:|
|   Alax Alves    | 	alaxallves@gmail.com   	|	        19 - 20           	|
|	Andre Filho	|	andre.filho001@outlook.com	|	18	-	20	|
|	Andre Lucas de Sousa Pinto	|	andrelucax@gmail.com	|	20	-	20	|
|	Arthur Assis	|	arthur120496@gmail.com	|	19	-	19	|
|	Caio Oliveira de Moraes	|	caiooliv97@gmail.com	|	21	-	21	|
|	Clarissa Borges	|	clarissalimab08@gmail.com	|	20	-	20	|
|	Elias Bernardo	|	ebmm01@gmail.com	|	21	-	21	|
|	Ezequiel De Oliveira	|	ezequiel1de1oliveira@gmail.com	|	20	-	20	|
|	Gabriela Barrozo Guedes	|	gabrielabguedes@gmail.com	|	19	-	20	|
|	Guilherme Augusto	|	guilherme.francais@gmail.com	|	19	-	21	|
|	João Vitor	|	joaovytor0@gmail.com	|	19	-	19	|
|	Joberth Rogers	|	joberth.rogers18@gmail.com	|	20	-	20	|
|	Larissa Sales	|	larissa.s.sales@outlook.com	|	20	-	20	|
|	Leonardo Medeiros	|	leonardomedeiros.6@gmail.com	|	20	-	20	|
|	Lucas Maciel Aguiar	|	lucasmacielaguiar@gmail.com	|	21	-	21	|
|	Luciano Santos	|	luciano_z7@hotmail.com	|	21	-	21	|
|	Mateus Nóbrega	|	mateus@nobrega.dev	|	20	-	20	|
|	Murilo Loiola Dantas|	murilo.loiola.dan@gmail.com	|	21	-	21	|
|	Rafael Makaha	|	rafael.makaha@gmail.com	|	20	-	20	|
|	Rafaella Junqueira	|	rafaellafjunqueira@gmail.com	|	21	-	21	|
|	Renato Coral Sampaio	|	renatocoral@gmail.com	|	20	-	21	|
|	Renato Britto Araujo	|	renatomwbbritto@gmail.com	|	20	-	20	|
|	Samuel de Souza Buters Pereira	|	sambuters@gmail.com	|	21	-	21	|
|	Thalisson Melo	|	tallisonmelo46@gmail.com	|	19	-	19	|
