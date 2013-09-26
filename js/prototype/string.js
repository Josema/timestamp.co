String.prototype.pad = Number.prototype.pad = function(n, char)
{
	char = (typeof char !== 'undefined') ? char : 0;
	for ( var i=0,nstr = ''; (n-(this.toString()).length) > i; ++i)
		nstr += char;

	return nstr + this;
};