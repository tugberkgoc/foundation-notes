
# Setup for Windows 10 Users

The tools used in this module are designed to be used in a Unix or Linux environment. Whilst this will create challenges for Windows 10 user there are some steps you will need to take. Please read and follow the steps below carefully:

Install the Windows Subsystem for Linux (WSL). Open PowerShell as Administrator and run:

``` shell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

Restart your computer when prompted.

Now install Visual Studio Code and once launched install the **WSL** component by Microsoft.

Now you need to install Ubuntu. This can be found by searching for `run linux on windows` in the Microsoft Store. You will be presented with the following screen.

![Microsoft Store](exercises/.images/store.png)

Choose the Ubuntu operating system (v18.04 LTS) and install. Once installed, click on the **Launch** button, this will open a console window and you will need to wait for a few minutes for the installation to complete.

## Cloning the Forked Repository

You will now need to fork the foundation lab by clicking on the Fork button. This will create a copy of the repository. See the standard setup instructions for more details.

Now you can clone your forked repository by running the following command in the Ubuntu console, replacing xxx with the URL of your repository.

```shell
git clone xxx
```

This will create a directory called `foundation` in the Ubuntu console. The final step is to launch VS Code from within the WSL environment by running the following command:

```shell
code foundation
```

This will launch VS Code from within the WSL with the contents of the `foundation/` directory. If you open the integrated terminal (using the **Terminal** menu) you will see that you have the full ubuntu bash shell. You can now run all the remaining steps from this integrated terminal, just as you would for a standard Linux install.

## Installing NodeJS

These steps are identical to those used on a full Ubuntu installation. Start by installing the Node Version Manager (NVM) tool:

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm --version
nvm install node
```

If the `nvm` command is not found you will need to reload the shell:

```shell
source ~/.profile
```

Now try to install again.

Now you can go directly to step 4 in the standard setup instructions.
