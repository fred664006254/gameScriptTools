/**
 * 页签按钮组
 * author dmj
 * date 2017/9/12
 * @class TabBarGroup
 */
class TabBarScrollGroup extends TabBarGroup
{
    //view的宽度
	private _viewWidth:number = 0;
	// 一行几个
	private _lineNum:number = 0;
	// 当前第几行
	protected _curLine:number = 1;

    private _scrollWidth:number = 0;
    protected _leftBtn : BaseButton = null;
    protected _rightBtn : BaseButton = null;
    protected _maxnum:number=0;

	public constructor() 
	{
		super();
	}

    public initScroll(textArr:Array<string>,callback:({param:any,index:number})=>void,handler:any,linenum ?: number,maxnum?:number):void
	{
        if(linenum){
            this._lineNum = linenum;
        }
        if(maxnum){
            this._maxnum = maxnum;
        }
        super.init("btn_tab_small",textArr,callback,handler);
    }

    	/**构建TabBar */
	protected buildTabTar():void{
        if(this._lineNum){
            this._viewWidth = 500;
            this._lineNum = 3;
            this._scrollWidth = 129;
        }
        else{
            if(egret.is(this,"PopupView")){
               this._viewWidth = 570;
               this._lineNum = 3;
            }
            else{
                this._viewWidth = GameConfig.stageWidth;
                this._lineNum = 4;
            }
            this._scrollWidth = this._viewWidth-104;
        }

        let swidth:number = this._viewWidth-104;
        this.scrollView.width = swidth;
        this.scrollView.x = 52;
        let posX:number = (swidth-this._lineNum*129-(this._lineNum-1)*4)/2;

        let lineCount:number = Math.ceil(this._tbArr.length/this._lineNum);

        if (lineCount>1)
        {
            let arrow_leftBtn = ComponentMgr.getButton("btn_leftpage", "", this.switchHandler, this, ["left"]);
            arrow_leftBtn.anchorOffsetX = arrow_leftBtn.width / 2;
            arrow_leftBtn.scaleX = arrow_leftBtn.scaleY = 0.7;
            arrow_leftBtn.x = 28;
            arrow_leftBtn.y = 4;
            this.addChild(arrow_leftBtn);
            this._leftBtn = arrow_leftBtn;

            let arrow_rightBtn = ComponentMgr.getButton("btn_leftpage", "", this.switchHandler, this, ["right"]);
            arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
            arrow_rightBtn.scaleX = -1 * 0.7;
            arrow_rightBtn.scaleY = 0.7;
            arrow_rightBtn.x = this._viewWidth - arrow_leftBtn.width*0.7 +14;
            arrow_rightBtn.y = arrow_leftBtn.y;
            this.addChild(arrow_rightBtn);
            this._rightBtn = arrow_rightBtn;
        }
        if(this._leftBtn){
            this._leftBtn.visible = this._curLine > 1;
        }
        if(this._rightBtn){
            this._rightBtn.visible = this._curLine < this._maxnum;
        }

        for (let l:number = 0; l<= lineCount; l++)
        {
            let fillBg = BaseBitmap.create("public_alphabg");
            fillBg.width = swidth;
            fillBg.height = 45;
            fillBg.setPosition(l*swidth,0);
            this.scrollContiner.addChild(fillBg);
        }

		for(var i = 0;i < this._tbArr.length;i++)
        {
            var tb:TabBar = this._tbArr[i];
            if(tb)
            {   
                let curPage:number = Math.floor(i/this._lineNum);
                let curIdx:number = i%this._lineNum;
                tb.x = posX+ curIdx*129 + curIdx*4 + curPage*this.scrollView.width;
            }
        }
        this.width = this._viewWidth;
		this.height = 47;
	}

    protected switchHandler(param: any) 
    {   
        if (param == "right") 
        {   
            let lineCount:number = Math.ceil(this._tbArr.length/this._lineNum);
            if(this._curLine < lineCount)
            {
                this._curLine++;
                this.scrollView.setScrollLeft(this._scrollWidth,100);
                this.clickButtonHandler(this._tbArr[(this._curLine-1)*this._lineNum]);

                if (this.getChildByName("reddot"))
                {
                    this.getChildByName("reddot").visible = false;
                }
            }
        }
        else if (param == "left") 
        {
            if(this._curLine > 1)
            {
                this._curLine--;
                this.scrollView.setScrollLeft(-this._scrollWidth,100);
                this.clickButtonHandler(this._tbArr[(this._curLine-1)*this._lineNum]);
            }
        }

    }

    public dispose():void
	{
        this._viewWidth = null;
        this._lineNum = null;
        this._curLine = 1;
        this._scrollWidth = 0;
        this._leftBtn = null;
        this._rightBtn = null;
        super.dispose();
    }
}