/**
 * 属下门客
 */
class AcBattleGroundChallengeViewTab2 extends PopupViewTab
{

	public servantList=[];
	public _scrollList: ScrollList=null;
	private challengebookNum:number =0;
	private _data:any =[];
	
    public constructor(data?) 
	{
		super();
		this.param = data;
		this.initView();
    }
    

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_SUPLIST), this.freshlist, this);
        let _bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		_bg.width = 528;
		_bg.height = 590;
		_bg.x = 20
		_bg.y = 55;
		this.addChild(_bg);
        // 出使条件
        let havenum = Api.itemVoApi.getItemNumInfoVoById(`2212`);
        let missionTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		missionTxt.text =LanguageManager.getlocal("acBattleGroundTip18-1", [havenum.toString()]);
		missionTxt.x = _bg.x + 10;
		missionTxt.y = _bg.y + 15;
        this.addChild(missionTxt);
        
        let missionTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(AtkraceChallengeItem.data.type == 3 ? "acBattleGroundTip17-1" : "acBattleGroundTip22-1", [LanguageManager.getlocal(`itemName_1552`), LanguageManager.getlocal(`itemName_2212`)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		missionTxt2.x = missionTxt.x;
		missionTxt2.y = missionTxt.y + missionTxt.textHeight + 5;
		this.addChild(missionTxt2);

         // 挑战书
        this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
        let challengeBookTxt = ComponentManager.getTextField("atkracechallengebook",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        challengeBookTxt.text =LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        challengeBookTxt.x = missionTxt.x+400;
        challengeBookTxt.y = missionTxt.y;
        
        if(PlatformManager.checkIsTextHorizontal()){
            challengeBookTxt.x = 570 - challengeBookTxt.width -10;
        }
        this.addChild(challengeBookTxt);
  
        if(AtkraceChallengeItem.data.type==3)
        {
            // 追杀令
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1553);
            challengeBookTxt.text =LanguageManager.getlocal("atkracekill",[this.challengebookNum+""]);
            if(PlatformManager.checkIsThSp())
            {
                 challengeBookTxt.x = this.x + this.width - challengeBookTxt.width - 30;
            }   
        }
        else
        {
             //挑战书
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
            challengeBookTxt.text =LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        }
        if (PlatformManager.checkIsTextHorizontal()) {
            challengeBookTxt.x = this.x + this.width - challengeBookTxt.width - 30;
        } 
        let keys = [];
		//let keys = idList2.concat(idList1);
	 
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 528, 515);
		this._scrollList = ComponentManager.getScrollList(AcBattleGroundChallengeItem, keys, rect);
        this.addChild(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal(`battlegroundcheertip20-1`));
        this._scrollList.setPosition(20, missionTxt2.y+missionTxt2.height + 10);
        
        NetManager.request(NetRequestConst.REQUEST_BATTLEGROUND_SUPLIST,{
            activeId :`${AcConst.AID_BATTLEGROUND}-${AtkraceChallengeItem.data.code}`
		});
    }
    
    private freshlist(evt : egret.Event):void{
        if(evt.data.ret && evt.data.data.data){
            let vo = <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
            let list = evt.data.data.data.supportlist;
            if(list){
                let arr = [];
                for(let i in list){
                    for(let j in list[i]){
                        let unit = list[i][j];
                        unit.servantId = j;
                        unit.uid = i;
                        unit.isbattle = vo.getIsCheerServantFight(Number(i),Number(j));
                        arr.push(unit);
                    }
                }
                arr.sort((a,b)=>{
                    if(a.isbattle && b.isbattle){
                        return b.fullattr - a.fullattr;
                    }
                    else if(a.isbattle){
                        return 1;
                    }
                    else if(b.isbattle){
                        return -1;
                    }
                    else{
                        return b.fullattr - a.fullattr;
                    }
                });
                this._scrollList.refreshData(arr);
            }
          
        }
    }

    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_SUPLIST), this.freshlist, this);
		super.dispose();
   	}
}