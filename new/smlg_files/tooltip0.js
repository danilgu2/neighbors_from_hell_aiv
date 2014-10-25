




/*
     FILE ARCHIVED ON 1:18:15 май 30, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:21:38 сен 6, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/

var OP = (navigator.userAgent.indexOf('Opera') != -1);
var IE = (navigator.userAgent.indexOf('MSIE') != -1 && !OP);
var NN4 = document.layers;
var DOM = document.getElementById;

function TOOLTIP ()
{
//----------------------------------------------------------------------------------------------------
// Configuration
//----------------------------------------------------------------------------------------------------
  this.width = 0;                     // width (pixels)
  this.bgColor = 'FFF6DF';             // background color #1B6EA3 
  this.textColor = '#000000';           // text color#FFFFFF
  this.borderColor = '#000000';         // border color#0E3A5B
  this.opacity = 100;                    // opacity (percent) - doesn't work with all browsers
  this.cursorDistance = 8;              // distance from cursor (pixels)

  // don't change
  this.text = '';
  this.height = 0;
  this.obj = 0;
  this.sobj = 0;
  this.active = false;

//----------------------------------------------------------------------------------------------------
// Methods
//----------------------------------------------------------------------------------------------------
  this.create = function() {
    if(!this.sobj) this.init();

    // var t = '<table border=0 cellspacing=0 cellpadding=4 width=' + this.width + ' bgcolor=' + this.bgColor + '><tr>' +
           // '<td align=left><font color=' + this.textColor + '>' + this.text + '</font></td></tr></table>';
			
	var t = '<table border="0" cellspacing="0" cellpadding="4" width="' + this.width + '" bgcolor="' + this.bgColor + '"><tr>' +
            '<td align="left"><font color="' + this.textColor + '">' + this.text + '</font></td></tr></table>';
			
			

    if (NN4)
	{
      t = '<table border=0 cellspacing=0 cellpadding=1><tr><td bgcolor=' + this.borderColor + '>' + t + '</td></tr></table>';
      this.sobj.document.write (t);
      this.sobj.document.close ();
    }
    else
	{
      this.sobj.border = '1px solid ' + this.borderColor;
      this.setOpacity ();
      if (document.getElementById) document.getElementById ('ToolTip').innerHTML = t;
      else document.all.ToolTip.innerHTML = t;
    }
	
    if (DOM) this.height = this.obj.offsetHeight;
    else if (IE) this.height = this.sobj.pixelHeight;
    else if(NN4) this.height = this.obj.clip.bottom;

    this.show ();
  }

  this.init = function ()
  {
    if (DOM)
	{
      this.obj = document.getElementById('ToolTip');
      this.sobj = this.obj.style;
    }
    else if (IE)
	{
      this.obj = document.all.ToolTip;
      this.sobj = this.obj.style;
    }
    else if (NN4)
	{
      this.obj = document.ToolTip;
      this.sobj = this.obj;
    }
  }

  this.show = function ()
  {
    var ext = (document.layers ? '' : 'px');
    var left = mouseX;
    var top = mouseY;

    if (left + this.width + this.cursorDistance - scrX > winX) left -= this.width + this.cursorDistance;
    else left += this.cursorDistance;

    if (top + this.height + this.cursorDistance - scrY > winY) top -= this.height;
    else top += this.cursorDistance;

    this.sobj.left = left + ext;
    this.sobj.top = top + ext;

    if (!this.active)
	{
      this.sobj.visibility = 'visible';
      this.active = true;
    }
  }

  this.hide = function()
  {
    if (this.sobj) this.sobj.visibility = 'hidden';
    this.active = false;
  }

  this.setOpacity = function()
  {
    this.sobj.filter = 'alpha(opacity=' + this.opacity + ')';
    this.sobj.mozOpacity = '.1';
    if (this.obj.filters) this.obj.filters.alpha.opacity = this.opacity;
    if (!document.all && this.sobj.setProperty) this.sobj.setProperty('-moz-opacity', this.opacity / 100, '');
  }
}

//----------------------------------------------------------------------------------------------------
// Global functions
//----------------------------------------------------------------------------------------------------
function getScrX()
{
  if (window.pageXOffset) scrX = window.pageXOffset;
  else if (document.documentElement && document.documentElement.scrollLeft)
    scrX = document.documentElement.scrollLeft;
  else if (document.body && document.body.scrollLeft)
    scrX = document.body.scrollLeft;
}

function getScrY()
{
  if (window.pageYOffset) scrY = window.pageYOffset;
  else if (document.documentElement && document.documentElement.scrollTop)
    scrY = document.documentElement.scrollTop;
  else if (document.body && document.body.scrollTop)
    scrY = document.body.scrollTop;
}

function getWinSize()
{
  if (window.innerWidth)
  {
    winX = window.innerWidth - 20;
    winY = window.innerHeight - 20;
  }
  else if (document.documentElement && document.documentElement.offsetWidth)
  {
    winX = document.documentElement.offsetWidth - 20;
    winY = document.documentElement.offsetHeight - 20;
  }
  else if (document.body && document.body.offsetWidth)
  {
    winX = document.body.offsetWidth - 20;
    winY = document.body.offsetHeight - 20;
  }
  else
  {
    winX = screen.width - 20;
    winY = screen.height - 20;
  }
}

function getMouseXY(e)
{
  getScrX();
  getScrY();
  getWinSize();

  if (IE)
  {
    mouseX = event.clientX + scrX;
    mouseY = event.clientY + scrY;
  }
  else
  {
    mouseX = e.pageX;
    mouseY = e.pageY;
  }

  if (mouseX < 0) mouseX = 0;
  if (mouseY < 0) mouseY = 0;

  if (tooltip && tooltip.active) tooltip.show();
}

function toolTip (text, width, opacity)
{
  if (text)
  {
    tooltip = new TOOLTIP();
    tooltip.text = text;
    if (width) tooltip.width = width;
    if (opacity) tooltip.opacity = opacity;
    tooltip.create();
  }
  else if (tooltip) tooltip.hide();
}

//----------------------------------------------------------------------------------------------------
// Build layer
//----------------------------------------------------------------------------------------------------
var tooltip = mouseX = mouseY = winX = winY = scrX = scrY = 0;

if (NN4)
{
  document.write ('<layer id="ToolTip"></layer>');
  document.captureEvents (Event.MOUSEMOVE);
}
else document.write ('<div id="ToolTip" style="position:absolute; z-index:69"></div>');

//----------------------------------------------------------------------------------------------------
// Event handlers
//----------------------------------------------------------------------------------------------------
document.onmousemove = getMouseXY;

//----------------------------------------------------------------------------------------------------
