
# Version Control

1. Working with Git Locally
2. Git Remotes

Before you start this worksheet make sure you have the latest lab materials:

```shell
$ git stash
$ git pull origin master
$ git stash pop
```

## 1 Working with Git Locally

Even if you are not working as part of a team, Git can offer a number of advantages. In this section you will learn how to use Git to manage your code within your local development environment.

### 1.1 Configuration

Before carrying out any work, the repository needs to be configured. This involves TODO

### 1.1 Test Your Knowledge

Create a new directory on your computer and, after navigating into it initialise an empty repository.

```shell
$ mkdir local_git/
$ cd local_git/
$ ls -a
  .  ..

$ git init
  Initialised empty Git repository in /home/johndoe/Documents/local_git/.git/

$ ls -a
  .  ..  .git
```

Running the `git init` command _initializes_ the repository and creates a new hidden directory called `.git/`. This contains all the information required to track your code changes.

next we need to add our user details and the preferred editor to the local configuration file which is kept in the `.git/` directory. Substitute your own name and email address. Since the **nano** text editor is far easier to use than the default **Vim** editor we will specify this as our default one. Finally we tell Git to cache our username and password for an hour (3600 seconds).

```shell
$ git config user.name "John Doe"
$ git config user.email 'johndoe@example.com'
$ git config core.editor 'nano'
$ git config credential.helper cache
$ git config credential.helper 'cache --timeout=3600'
$ git config --list
  credential.helper=cache --timeout=3600
  core.editor=nano
  user.name=John Doe
  user.email=johndoe@example.com
```

Now we will create a new document in the `local_git/` directory.

```shell
$ touch index.js
$ ls -a
  .  ..  .git  index.js
```

Git should have tracked the changes in the project directory and noticed that there is an additional file.

```shell
$ git status
  On branch master

  Initial commit

  Untracked files:
    (use "git add <file>..." to include in what will be committed)

    index.js

  nothing added to commit but untracked files present (use "git add" to track)
```

As you can see, the new `index.js` file is not currently being tracked. Let's enable tracking for this file. This is done in two steps, files are staged and then the staged files are committed to the repository with a commit message that explains the changes.

```shell
$ git status
  On branch master

  Initial commit

  Changes to be committed:
    (use "git rm --cached <file>..." to unstage)

    new file:   index.js

$ git commit
```

This will open the **Nano** text editor (the one we specified as our default) so we can add a commit message.

```

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
#
# Initial commit
#
# Changes to be committed:
#       new file:   index.js
#


                                           [ Read 10 lines ]
^G Get Help   ^O Write Out  ^W Where Is   ^K Cut Text   ^J Justify    ^C Cur Pos    ^Y Prev Page
^X Exit       ^R Read File  ^\ Replace    ^U Uncut Text ^T To Spell   ^_ Go To Line ^V Next Page
```

Enter the text `added index.js file` on the top line then save using _ctrl+o_ and finally quit using _ctrl+x_ (all available commands are listed along the bottom of the editor window). You will see the following message in the terminal window.

```
[master (root-commit) d9036c2] added index.js file
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 index.js
```

To see the most recent commits you can use the `git log` command.

```
$ git log
commit d9036c2bdf224ea72981eaa095ef76931c92e31d
Author: John Doe <ohndoe@example.com>
Date:   Fri Jun 16 09:04:00 2017 +0100

    added index.js file

```

If we check the status of the repository we should see that there are no further files to commit.

```
$ git status
On branch master
nothing to commit, working tree clean
```

Next we will edit the index.js file. You can either open it in a visual code editor or use `nano index.js`. Enter the following then save your changes.

```javascript
// this is a simple script to show how git works
console.log('Hello Git!')
```

If we check our repository status.

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   index.js

no changes added to commit (use "git add" and/or "git commit -a")
```

This time we will use a shortcut that stages the changes and makes a commit all from a single `git commit` command.

```shell
$ git commit -am 'added message to index.js'
  [master 721df6d] added message to index.js
   1 file changed, 2 insertions(+)
```

The `-a` flag automatically stages all modified files and the `-m` flag allows us to add the commit message without opening our text editor.

```shell
$ git log
commit 721df6dc9368bbe948be86fc19e696b7059dce5f
Author: Mark Tyers <marktyers@gmail.com>
Date:   Fri Jun 16 09:17:29 2017 +0100

    added message to index.js

commit d9036c2bdf224ea72981eaa095ef76931c92e31d
Author: Mark Tyers <marktyers@gmail.com>
Date:   Fri Jun 16 09:04:00 2017 +0100

    added index.js file
```

As you can see, there are now two commits in our repository. If there are too many commits to fit on the screen you can navigate using `space` for the next page, `w` for the previous page and `q` to quit.

## 2 Git Remotes

In the previous section you learned how to use Git to track local changes. In this section you will learn how to use remote git services.

You will be shown two ways to configure this depending on whether you already have a local Git repository. The examples will be using Coventry University's [GitHub](https://github.coventry.ac.uk) server but these will work equally with other services such as [GitLab](www.gitlab.com) or [BitBucket](www.bitbucket.com).

### 2.1 Adding a Remotes

If you already have a local Git repository (such as the one in your `local_repo/` directory), you can connect this to a remote.

Log onto the GitHub server using your University credentials. Now locate and view the _organisation_ for your current module:

1. Click on the **Enterprise** link in the top-left corner of the web page.
2. Locate the drop-down menu just underneath this. It will default to your personal space (matching your username).
3. From the dropdown list choose the correct module, it will look something line this: `205CDE-1718JANMAY`.
4. Locate the button labelled **View 205CDE-1718JANMAY**.

Now we can create a new, empty repote repository and connect this to your local repository:

1. Click on the **New** button.
2. Enter the details for your new repository:
    1. Enter your username as the repository name.
    2. Leave the description blank.
    3. Keep the permissions set to _Private_.
    4. Click on the **Create repository** button.
3. You will now see the default empty repository screen:
    1. Locate the link to the repository, it will look something like: https://github.coventry.ac.uk/205CDE-1718JANMAY/xxxx.git where xxxx is your username.
    2. Copy this url to the clipboard.
    3. Make sure the terminal is open in your project directory.
    4. Add the new empty remote: `git remote add origin xxx` where xxx is the url you copied to the clipboard.
    5. Check the remote has been added `git remote -v`.
4. Now we need to [get an access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) from the GitHub server.
5. Finally we can push the local commits to the GitHub server:
    1. Check your local commits are there `git status`.
    2. Push the commits using `git push origin master`.
        1. You will need to enter your username.
        2. Use the access token instead of the password.
    3. Check all commits are pushed:
        1. `git status`.
        2. Refresh the GitHub page.

#### 2.1.1 Test Your Knowledge

Create an account on GitHub.com and log in. Click on the green **New repository** button and in the _Repository name_ field enter `remote-repo`. Leave the description blank and click on the green **Create repository** button.

near the top of the screen you will see a section called _Quick setup_ which will be displaying a url. There are two URLs, one uses HTTP and the other uses SSH/Git. Make sure the **HTTPS** option is selected and copy the url to the clipboard, it should look something like this.

```shell
https://github.com/johndoe/remote-repo.git
```

In the terminal, make sure you are still in the `local_git/` directory and add the GitHub remote to your project.

```shell
$ git remote
$ git remote add origin https://github.com/johndoe/remote-repo.git
$ git remote
  origin
```

The first time we view the remotes none are shown. We then add our GitHub remote and assign it the name `origin`, which is the standard name used by Git. If we now list the remotes we see that origin has now been added.

Finally we push our commits to the remote repository on GitHub.

```shell
$ git push origin --all
  Username for 'https://github.com': johndoe
  Password for 'https://johndoe@github.com':
  Counting objects: 6, done.
  Delta compression using up to 8 threads.
  Compressing objects: 100% (3/3), done.
  Writing objects: 100% (6/6), 506 bytes | 0 bytes/s, done.
  Total 6 (delta 0), reused 0 (delta 0)
  To https://github.com/marktyers/remote-repo.git
   * [new branch]      master -> master
```

If we refresh the repository web page on GitHub you should see the `index.js` file. The complete repository has been pushed including both our commits which can be seen under the _commits_ tab.

If you select the _commits_ tab you should see your profile picture and name next to each of the two commits.

![GitHub commits](.images/github_commits.png)

 If this has not happened it means that the name and email you have stored in the local git config settings _don't match the details you have stored on GitHub_. You can't retrospectively fix the current commits but, if you update the local settings, all future commits will show your details correctly.

### 2.2 Cloning a Repository

TODO

```shell
$ git remote show
  origin
$ git remote get-url origin
  https://github.coventry.ac.uk/304CEM-1718SEPJAN/TEACHING-MATERIALS.git
```
