<?php echo time(); ?>
<br>
<script>document.write(Math.round(new Date().getTime()/1000));</script>
<br>
<?php
echo date("M d Y H:i:s", time());
?>a<br>b
<?php
echo gmdate("M d Y H:i:s", time);
?>


