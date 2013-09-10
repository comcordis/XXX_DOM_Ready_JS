<?php

XXX_Static_Publisher::publishItem(array
(
	'sourcePath' => XXX_Path_Local::composeOtherProjectDeploymentSourcePathPrefix($project, $deployIdentifier),
	'destinationPath' => XXX_Path_Local::extendPath(XXX_Static_Publisher::$destinationPathPrefix, $project)
));

?>