set -e
fsospw='freeStyleOS'
test_stand_ip='10.92.163.217'
echo 'Backing up development version of node_modules...'
mv node_modules node_modules.dev
mvn install -Pncui -Pcrewserve-ui -DskipTests
echo 'Copying ncui.pkg to /var/freestyle/content...'
sshpass -p ${1:-$fsospw} scp target/ncui.pkg root@${2:-$test_stand_ip}:/var/freestyle/content
#echo 'Copying crewserveui.pkg to /var/freestyle/content...'
#sshpass -p ${1:-$fsospw} scp ../../../../extras/extras-crewserve-ui/target/crewserve-ui.pkg root@${2:-$test_stand_ip}:/var/freestyle/content
echo 'Copying device-dispenser-app-1.0-SNAPSHOT.jar to /opt/freeStyleOS/jar...'
sshpass -p ${1:-$fsospw} scp ../../device-dispenser-app/target/device-dispenser-app-1.0-SNAPSHOT.jar root@${2:-$test_stand_ip}:/opt/freeStyleOS/jar
echo 'Restoring development version of node_modules...'
rm -rf node_modules
mv node_modules.dev node_modules
echo 'Done... Reboot your dispenser now'
