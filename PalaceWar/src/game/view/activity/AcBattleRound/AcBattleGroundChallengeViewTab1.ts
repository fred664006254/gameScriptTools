/**
 * 属下门客
 */
class AcBattleGroundChallengeViewTab1 extends PopupViewTab
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
		let _bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		_bg.width = 528;
		_bg.height = 590;
		_bg.x = 20
		_bg.y = 55;
		this.addChild(_bg);
		// 出使条件
		let missionTxt = ComponentManager.getTextField("atkracechallengedes",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		missionTxt.text =LanguageManager.getlocal("atkracechallengedes");
		missionTxt.x = _bg.x + 10;
		missionTxt.y = _bg.y + 15;
		this.addChild(missionTxt);

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
		let idList= Api.servantVoApi.getServantCountLevel60PlusList();
        let idList1=[];
        let idList2=[];
        for (var index = 0; index < idList.length; index++) {
            let key = idList[index];
			 if (!this.isBattleing(key))
            {
                idList1.push(key);
            }else
            {
                idList2.push(key);
            }
        }
        let keys = idList1.concat(idList2);
		//let keys = idList2.concat(idList1);
	 
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 528, 535);
		this._scrollList = ComponentManager.getScrollList(AtkraceChallengeItem, keys, rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(20, missionTxt.y+missionTxt.height + 10);
	}

	public isBattleing(servantId:string)
   	{
		//let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
        let myInfo:AtkraceInfoVo = null;
        if(AtkraceChallengeItem.data.battleground){
            let vo = <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
            myInfo = vo.getMyInfo();
        }
        else{
            myInfo = Api.atkraceVoApi.getMyInfo();
        }
        for (var key in myInfo.asids) {
            if(myInfo.asids[key] == servantId)
                return true;
        }
        return false;
    }

    public dispose():void
	{

		super.dispose();
   	}
}