---
title: 32 位元程式使用 reg 去讀取 Windows 64 位元的登錄檔資料
date: 2011-10-04T21:49:00+08
tags:
  - Easy_run_class
---
# 32 位元程式使用 reg 去讀取 Windows 64 位元的登錄檔資料

使用 Dev-C++所編譯出來的程式，都是32位元的

在x64的系統中，有時候會導致讀取不到想要讀取的資料

舉例：

若安裝 64 位元的 JDK，則在 Dev-C++ 讀取不到 Java 的安裝路徑

```
REG QUERY "hklm\SOFTWARE\JavaSoft\Java Development Kit" /v CurrentVersion  (找不到)
```

這時，請改用以下敘述

```
%windir%\Sysnative\REG QUERY "hklm\SOFTWARE\JavaSoft\Java Development Kit" /v CurrentVersion
```

因為在 x64 系統中執行 32 位元的程式，會自動進入 WOW64 的模式，位於 `%windir%\System32` 的 `reg.exe` (64bit) 會被重定向到 `%windir%\SysWOW64` 的 `reg.exe` (32bit)

若要在32位元的程式中強制讀取位於 `%windir%\System32` 的 `reg.exe` (64bit)，則須改用 `%windir%\Sysnative\`

- - -

參考資料：

* <http://blog.csdn.net/andylin02/article/details/2679792> - [重定向](http://blog.csdn.net/andylin02/article/details/2679792)
* <http://blog.xuite.net/y0933717246/IT/39759341> - 補充說明 SysWoW64 目錄
* <http://www.cnblogs.com/hsapphire/archive/2011/03/09/1978519.html> - 如何通过使用 64 位版本 Windows 查看系统注册表 WOW6432Node
* <http://www.tipandtrick.net/2008/how-to-suppress-and-bypass-system32-file-system-redirect-to-syswow64-folder-with-sysnative/zh_TW/> - 如何制止和繞道system32文件系統重定向到SysWow64文件夾與sysnative
* <http://www.tipandtrick.net/2008/how-to-suppress-and-bypass-system32-file-system-redirect-to-syswow64-folder-with-sysnative/> - How to Suppress and Bypass System32 File System Redirect to SysWOW64 Folder with Sysnative

* 什么是重定向

无论是 Windows XP Professional X64 Edition、Windows Server 2003 X64 Edition 还是 Windows Vista X64 Edition（以下把均统称为 X64 系统），都引入了一项技术：文件和注册表的重定向。

之所以有这个技术，是为了将 32 位程序和 64 位程序分离开。这种在 64 位平台上运行 32 位程序的模拟器被称为 WOW64。WOW64 是 `Windows 32 on Windows 64` 的简称，它在系统层中另提供了一层，以支持老式的 32 位程序。

在 X64 系统里面，一些特殊的目录和特殊的注册表键被分为 2 个独立的部分。对于文件系统来说，`%systemroot%/system32` 目录被保留给 64 位文件使用，而 32 位文件会被重定向到 `%systemroot%/SysWOW64` 目录。换句话说，所有的 32 位程序一般情况下只会出现在 `%systemroot%/SysWOW64` 目录里面。任何 32 位程序试图访问 `%systemroot%/system32` 目录的企图都会被重定向到 `%systemroot%/SysWOW64` 目录。这个是一个默认的行为，除非程序的线程明确的指名需要关闭这种重定向机制。

对于注册表来说，也有类似的内容。WOW64 子系统也提供了对注册表访问的重定向。如果是 32 位程序，对注册表的操作不论是读还是写，WOW64 都将会截取对`HKLM/Software` 访问，并重定向到 `HKLM/Software/Wow6432Node`（即 32 位应用程序的注册信息被写在 `HKLM/Software/Wow6432Node` 中，而不是预期的 `HKLM/Software` 中）；如果是 64 位程序，就直接到 `HKLM/Software`。

* 需要重定向的注册表项

注册表重定向，其实质就是维护两套不同的注册表键，一套用于 64 位，一套用于 32 位。受影响的键不只是上面提及的 `HKLM/Software`，还包括：  

```
HKEY_CLASSES_ROOT   
HKEY_CURRENT_USER/Software/Classes   
HKEY_LOCAL_MACHINE/Software   
HKEY_USERS/*/Software/Classes   
HKEY_USERS/*_Classes
```

其中，64位程序的注册信息存储在上面的健中，32位程序的注册信息重定向存储在下列健中：

```
HKEY_CLASSES_ROOT/WOW6432node   
HKEY_CURRENT_USER/Software/Classes/WOW6432node   
HKEY_LOCAL_MACHINE/Software/WOW6432node   
HKEY_USERS/*/Software/Classes/WOW6432node   
HKEY_USERS/*_Classes/WOW6432node
```

当运行 32 位程序，wow64 会截取程序对注册表 `HKLM/Software` 的访问，并重定向于 `HKLM/Software/Wow6432Node`。

如前面所述，以上这些键会被维护 2 套，但是这2套键是如何维护的呢？其维护的方法是采用一种被称为注册表反射的机制完成的。

* 注册表反射

注册表反射是在 64 位注册表视图和 32 位注册表视图之间复制某些特定的注册表项和项值。

如在 X64 系统中，我们在安装 64 位 `Microsoft Office` 后，64 位的 `Winword.exe` 将注册 `.doc` 这个扩展名并把这个扩展名关联到 `Winword.exe` 程序，根据 X64 的运行机制，64 位程序修改的是 64 位的注册表键值，但是 WOW64 会自动的把这个修改会同步到 32 位的注册表键下面，这样 32 位和 64 位的应用程序都可以使用 64 位 `Winword.exe` 打开 `.doc` 文件。

但是，并不是所有的键值都会受到注册表反射机制的影响。实验证明，如果我们使用 32 位的注册表编辑器在 `HKEY_LOCAL_MACHINE/Software` 下新建一个项，然后使用 64 位的注册表编辑器查看，会发现这个项只会出现在 `HKEY_LOCAL_MACHINE/Software/Wow6432Node` 键下而不会出现在 `HKEY_LOCAL_MACHINE/Software` 键下，因为 `HKEY_LOCAL_MACHINE/Software` 键是专门用于存放 64 位程序所使用的注册表数据的，而 `HKEY_LOCAL_MACHINE/Software/Wow6432Node` 键是专门用于存放 32 位程序所使用的注册表数据的

注册表中受到反射机制影响的有：

`HKEY_LOCAL_MACHINE/Software/Classes`（32 位 XP 下读写 `HKEY_CLASSES_ROOT/Rising.Rav.20` 会同时出现 `HKEY_LOCAL_MACHINE/Software/Classe/Rising.Rav.20`，两者的值永远相同，似乎有一个是镜像，64 位 XP 下读写 `HKEY_CLASSES_ROOT/Rising.Rav.20` 则会被重定向到 `HKEY_LOCAL_MACHINE/Software/Classe/Rising.Rav.20`，并且由于注册表反射的原因，同时也会修改 `HKEY_LOCAL_MACHINE/SOFTWARE/Wow6432Node/Classes/Rising.Rav.20`，两者的值同样是永远相同的。）

```
HKEY_LOCAL_MACHINE/Software/COM3  
HKEY_LOCAL_MACHINE/Software/EventSystem  
HKEY_LOCAL_MACHINE/Software/Ole  
HKEY_LOCAL_MACHINE/Software/Rpc  
HKEY_USERS/*/Software/Classes  
HKEY_USERS/*_Classes
```

* 注册表重定向机制对系统的影响

由于注册表重定向机制存在，下列程序调用没有问题：

32 位应用程序 a 调用 32 位应用程序 b 并访问 b 的注册表信息。由于注册表重定向机制，32 位应用程序 b 的注册信息在 `HKLM/Software/Wow6432Node` 中，而 32 位应用程序 a 访问注册表也会被重定向到 `HKLM/Software/Wow6432Node` 中，所以访问正常；

64 位应用程序 a 调用 64 位应用程序 b 并访问 b 的注册表信息。64 位应用程序 b 的注册信息在 `HKLM/Software`，64 位应用程序 a 访问注册表时直接访问 `HKLM/Software`，所以访问正常；

但是在下列情况时会出现问题：

64 位应用程序调用 32 位应用程序并访问其注册表信息。

如瑞星杀软有 U 盘病毒查杀功能，在插入 U 盘后弹出的提示框中有瑞星杀毒的标志；但是在 64 位系统中，此项功能失效。这是因为 32 位瑞星将此项功能的注册信息写到了 `HKLM/Software/Wow6432Node` 下；而调用该功能的应用程序是 64 位的操作系统，由于 64 位操作系统访问注册表时直接访问 `HKLM/Software`，所以没有读取到该功能的注册数据，该功能因而失效。

解决方法：在此功能写注册表时，32 位瑞星应用程序要将该注册信息写到 64 位程序的注册表项中，即 `HKLM/Software` 下。

32 位应用程序调用 64 位应用程序并访问其注册表信息。解决方法可以参上。

* 应用程序如何访问注册表

上文提到 32 位与 64 位应用程序分别访问注册表问题，下面总结一下：

* 64 位程序如何访问 64 位的注册表 `HKLM/Software`
* 64 位程序访问 64 位的注册表，直接到 `HKLM/Software`。
* 32 位程序如何访问32位的注册表 `HKLM/Software/Wow6432Node`
* 32 位程序访问 32 位的注册表， WOW64 将会截取对 `HKLM/Software` 访问，并重定向到 `HKLM/Software/Wow6432Node`
