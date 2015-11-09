#! /bin/bash

echo "*****************************"
echo "* PUSH CHANGES TO GIT PAGES *"
echo "*****************************"

FROM=`pwd`
FOLDERTO="$HOME/gh-pages"
TO="$FOLDERTO/`basename $FROM`"

echo "HOME="$HOME
echo "FROM=$FROM"
echo "FOLDERTO=$FOLDERTO"
echo "TO=$TO"

DATE=`date +"%Y.%m.%d-%H:%M"`
TO_OLD=$TO'-OLD-'$DATE

mv $TO $TO_OLD && \
cp -r $FROM $FOLDERTO && \
rm -rf $TO'/.git' && \
cp -r $TO_OLD'/.git' $TO && \
cd $TO && \

git status

read -p "You want to continue? [y|*N*]: " OPTION

if [ "$OPTION" == "y" ]; then

    read -p "Write the commit message: " MESSAGE

    git add . && \
    git commit -m "$MESSAGE" && \
    git push origin gh-pages && \
    rm -rf $TO_OLD

else

    echo "rm -rf $TO" && \
    rm -rf $TO && \
    echo "mv $TO_OLD $TO" && \
    mv $TO_OLD $TO

fi

cd -
