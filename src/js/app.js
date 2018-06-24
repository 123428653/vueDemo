
var store={
	saveItem(key,val){
		localStorage.setItem(key,JSON.stringify(val));
	},
	getItem(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	},
};
var list=store.getItem('vueData');

var vm=new Vue({
 	el:'#main',
 	data:{
 		list:list,
 		addData:'',
 		editTodo:'',
 		beforeTitle:'',	//记录编辑前的标题，方便取消恢复数据
 		visibility:'all'
 	},
 	watch:{
 		list:{
 			handler:function(){
 				store.saveItem('vueData',this.list);
 			},
 			deep:true
 		}
 	},
 	computed:{
 		// 计算属性
		listLen(){
			return this.list.filter(function(item){
				return !item.isChecked
			}).length
		},
		filterList(){
			var filter={
				all(list){
					return list;
				},
				finished(list){
					return list.filter(function(item){
						return item.isChecked;
					})
				},
				unfinished(list){
					return list.filter(function(item){
						return !item.isChecked;
					})
				}
			};
			return filter[this.visibility] ? filter[this.visibility](this.list) : this.list;
		}
 	},
 	directives:{
 		"focus":{
 			update(el,binding){
 				// 自定义事件
 				/*console.log(el)
 				console.log(binding)*/
 				if(binding.value){
 					el.focus();
 				}
 			}
 		}
 	},
 	methods:{
 		addList(){
 			if(!this.addData) return;
 			this.list.push({
 				title:this.addData,
 				isChecked:false
 			})
 			this.addData = '';
 		},
 		del(item){
 			// if(confirm('确认删除该数据吗?')){
 				var index=this.list.indexOf(item);
 				this.list.splice(index,1);
 			// }
 		},
 		edit(item){

 			this.beforeTitle=item.title;
 			this.editTodo=item;
 		},
 		edited(ev){
 			this.editTodo='';
 		},
 		cancelFn(item){
			item.title = this.beforeTitle;
			this.editTodo = ''
 		}
 	}
})

 function hashChanged(){
 	var hash=window.location.hash.slice(1);
	vm.visibility=hash
 	console.log(hash);
 }
 hashChanged()

window.addEventListener('hashchange',hashChanged)

