/**
Неймспейсы нужны затем же, зачем и во всех остальных языках.
Чтобы разрграничить пространства имён классов, функций, объектов и прочих переменных.

Однако в JS никаких неймспейсов нет и приходится как-то извращаться.

Наш неймспейс представляет собой объект.
Например, у нас есть две функции:
org.omich.fun1 и org.omich.fun2
Т.е. смысл таков, что это функции fun1 и fun2, лежащие в пространстве имён org.omich.

Но по сути, эту систему можно представить так:
	window.org = {
		omich: {
			fun1: function(){},
			fun2: function(){}
		}
	}

Т.е. функции fun1 и fun2 являются полями некоего объекта,
который лежит в поле omich некоего другого объекта,
который лежит в поле org глобального объекта window.


Но у нас возникает желание добавлять из разных мест объекты и функции в одно и то же пространство имён.
При этом, мы не можем просто написать:

	org.omich.fun3 = function(){}

потому что мы не знаем, существует ли объект org.omich. И если он не существует, то случится ошибка.
С друго стороны мы не можем написать:

	org = {}; org.omich = {}
	org.omich.fun3 = function(){}

потому что тогда мы убьём всё то, что содержалось в пространстве имён до нас.

Поэтому мы должны сделать следующее:

	if(!window.org)
	{
		org = {}
	}
	else if(!org.omich)
	{
		org.omich = {}
	}

	org.omich.fun3 = function(){}

На JS этот же кусочек кода принято записывать так:

	org = window.org || {}
	org.omich = org.omich || {}
	org.omich.fun3 = function(){}

При этом, если пространство имён содержит много уровней вложенности,
то пришлось бы писать довольно длинную лесенку таких присваиваний.

Поэтому мы написали функцию помощник, которая принимает на вход строку вида:
"org.omich.tortoise"
и создаёт все необходимые объекты, если они не существовали.
*/
(function()
{
	var context = this;
	
	var analyse_namespace = function(namespace, null_analyser)
	{
		var prevIndex = 0;
		var nextIndex = namespace.indexOf('.', 0);
		var parent = context;

		do
		{
			nextIndex = namespace.indexOf('.', prevIndex);
			var key = nextIndex >= 0 ? namespace.substring(prevIndex, nextIndex) : namespace.substring(prevIndex);
			parent[key] = parent[key] || null_analyser(key, parent[key]);
			parent = parent[key];
			prevIndex = nextIndex + 1;
		}
		while(nextIndex >= 0);

		return parent;
	}

	function ns(namespace)
	{
		return analyse_namespace(namespace, function()
			{
				return {};
			});
	};

	function ns_run(namespace, fun)
	{
		return fun(Om.ns(namespace));
	};

	function ns_get(namespace)
	{
		return analyse_namespace(namespace, function(key)
			{
				throw new Error('Namespace "' + namespace + '" is not found. Problem key is "' + key + '"');
			});
	};



	Om = {
		ns     : ns,
		ns_run : ns_run,
		ns_get : ns_get
	}
})()
