<?php echo time(); ?>
<br>
<script>document.write(Math.round(new Date().getTime()/1000));</script>
<br>
<?php
date_default_timezone_set('Europe/London');
echo date("M d Y H:i:s", time());
?><br>
<?php

echo gmdate("M d Y H:i:s", time());
?>


