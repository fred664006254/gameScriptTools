class NewInviteVo extends BaseVo
{
	public code = "";
	public info : any = {};//--{uid = {uid,name,power}}
	public rinfo : any = {};//= {invite = {},power={}},
	public iuid = 0;//--绑定者ID
	public oinfo : any = {}//= {red=1},--初始红点为1 点击getinfo后为0

	public constructor() {
		super();
	}

	public initData(data:any):void{
		if(data){
			for(let key in data){
				this[key]=data[key];
			}
		}
	}

	public dispose():void{
		this.code = "";
		this.info = {};//--{uid = {uid,name,power}}
		this.rinfo = {};//= {invite = {},power={}},
		this.iuid = 0;//--绑定者ID
		this.oinfo = {}//= {red=1},--初始红点为1 点击getinfo后为0
	}
}