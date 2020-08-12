/**
 * 页签按钮组
 * author dmj
 * date 2017/9/12
 * @class TabBarScrollGroup
 */
class TabBarScrollBtnGroup extends TabBarScrollGroup{

	public constructor() 
	{
		super();
	}


    protected switchHandler(param: any) {   
        if (param == "right") {   
            let lineCount:number = this._maxnum;
            if(this._curLine < lineCount)
            {
                this._curLine++;
                this.scrollView.setScrollLeft(Math.min(129*(this._curLine-1), 260),100);
                if (this.getChildByName("reddot"))
                {
                    this.getChildByName("reddot").visible = false;
                }
            }
        }
        else if (param == "left") {
            if(this._curLine > 1)
            {
                this._curLine--;
                this.scrollView.setScrollLeft(Math.max(-129*(this._curLine-1), 0),100);
            }
            if (this.getChildByName("reddot"))
            {
                this.getChildByName("reddot").visible = false;
            }
        }
        if(this._leftBtn){
            this._leftBtn.visible = this._curLine > 1;
        }
        if(this._rightBtn){
            this._rightBtn.visible = this._curLine < this._maxnum;
        }
        this.clickButtonHandler(this._tbArr[this._curLine - 1]);
    }

    public dispose():void{
        super.dispose();
    }
}