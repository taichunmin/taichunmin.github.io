---
title: 一直想寫的數獨程式
date: 2011-07-09T11:05:00+08
tags:
  - sudoku
  - JAVA
---
# 一直想寫的數獨程式

這個是在我期末那周拚出來的數獨遊戲  
其實很久以前就很想寫樹讀了  
但是一來沒有什麼壓力  
二來C++也不是合寫這種  
三來我Visual C++不熟悉，寫不出這種東西  
所以一直拖到了現在才寫出數獨遊戲!!  
另外 裡面還有一些附屬檔案  
我就放到下面的這個連結給大家抓吧

<http://dl.dropbox.com/u/12113131/program/sudoku.rar>

```java
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.io.*;
import java.util.*;
public class sudoku extends JFrame // implements ActionListener implements KeyListener
{
  private JPanel gameBoard,settingBoard,tempPanel[];
  private JButton btn[],loadbtn,designbtn;
  private JTextField filename;
  private String columnSpace,rowSpace; 
  private Font btnFont;                                  // 字形
  private int SIZE = 600, win;
  private FileAction fileAction;
  private GameAction gameAction;
  private Color warnningColor;
  private int checkSet[][];
  public static void main(String[]args)
  {
    sudoku new_game = new sudoku();
    new_game.setVisible(true);
  }
  public sudoku()
  {
    super("數獨遊戲");      // 視窗標題
    btnFont = new Font(null,Font.BOLD,30);                                    // 設定字形大小gameBoard = new JPanel();
    setSize(SIZE + 17, SIZE + 57);                                            // 設定視窗大小
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);                           // 設定右上方的 X 可關閉程式
    setLayout(new BorderLayout());                                            // 設定版面 (BorderLayout 是有五個方向的排版方式)
    setResizable(false);                                                      // 設定不可變更視窗大小
    columnSpace="　";
    rowSpace="  　";
    tempPanel = new JPanel[2];
    add(new JLabel(rowSpace),BorderLayout.WEST);
    add(new JLabel(columnSpace),BorderLayout.NORTH);
    
    settingBoard = new JPanel();
    settingBoard.setLayout(new FlowLayout());
    settingBoard.add(new JLabel("檔案名稱："));
    filename = new JTextField("save.txt",20);
    settingBoard.add(filename);
    fileAction = new FileAction();
    loadbtn = new JButton("Load");
    loadbtn.addActionListener(fileAction);
    settingBoard.add(loadbtn);
    designbtn = new JButton("Design");
    designbtn.addActionListener(fileAction);
    settingBoard.add(designbtn);
    
    add(settingBoard,BorderLayout.SOUTH);
    
    gameBoard = new JPanel();
    gameAction = new GameAction();
    gameBoard.setLayout(new GridLayout(3,3));                                 // 設定排版為九個格子 (GridLayout 是很像畫格子的排版方式)
    btn = new JButton[81];
    for(int i=0;i<9;i++)
    {
      tempPanel[0] = new JPanel();
      tempPanel[0].setLayout(new BorderLayout());
      tempPanel[0].add(new JLabel(rowSpace),BorderLayout.EAST);
      tempPanel[0].add(new JLabel(columnSpace),BorderLayout.SOUTH);
      tempPanel[1] = new JPanel();
      tempPanel[1].setLayout(new GridLayout(3,3));
      for(int j=0;j<9;j++)
      {
        int index = i/3*27 + i%3*3 + j/3*9 + j%3;
        btn[index] = new JButton("");          // 設定按鈕文字
        btn[index].addActionListener(gameAction);    // 設定按鈕的動作
        btn[index].setActionCommand(""+index);     // 設定按鈕的指令 (將按鈕的編號轉成 String 設定給 ActionCommand)
        btn[index].setFont(btnFont);           // 設定按鈕的字形
        tempPanel[1].add(btn[index]);             // 將按鈕加進 gameBoard
      }
      tempPanel[0].add(tempPanel[1],BorderLayout.CENTER);
      gameBoard.add(tempPanel[0]);
    }
    
    warnningColor = Color.RED;
    win = 0;
    checkSet = new int[27][9];
    for(int i=0;i<9;i++)
      for(int j=0;j<9;j++)
      {
        checkSet[i][j]= i *9 + j; // 水平
        checkSet[9+i][j]= j *9 + i; // 垂直
        checkSet[18+i][j]=(i/3*3+j/3) *9 + (i%3*3+j%3); // 九宮格
      }
      add(gameBoard, BorderLayout.CENTER);   // 將 gameBoard 加到視窗的中央
  }
  private int check()
  {
    //if(win == 1)return win;
    win = 1;
    clear_btn_background();
    for(int i=0;i<checkSet.length;i++)
      if(check_paint(checkSet[i]))win = -1;
    for(int i=0;i<81 && win==1;i++)
      if(btn[i].getText().equals(""))win = 0;
    return win;
  }
  private boolean check_paint(int checkArr[])
  {
    boolean paint = false;
    int data[] = new int[10];
    for(int i=0;i<data.length;i++)
      data[i]=0;
    for(int i=0;i<checkArr.length;i++)
    {
      if( btn[ checkArr[i] ].getText().equals(""))continue;
      int temp = Integer.parseInt( btn[ checkArr[i] ].getText() );
      if(data[temp]!=0)
      {
        if(data[temp]<0)data[temp]=-data[temp];
        btn[data[temp]-1].setBackground(warnningColor);
        paint = true;
        data[temp]=-checkArr[i]-1;
      }
      else data[temp]=checkArr[i]+1;
    }
    for(int i=0;i<data.length;i++)
      if(data[i]<0)
      {
        btn[-data[i]-1].setBackground(warnningColor);
        paint = true;
      }
    return paint;
  }
  private void clear_btn()
  {
    for(int i=0;i<81;i++)
    {
      btn[i].setText("");
      btn[i].setActionCommand(""+i);
    }
    designbtn.setText("Design");
    designbtn.setActionCommand("Design");
    win = 0;
    clear_btn_background();
  }
  private void clear_btn_background()
  {
    for(int i=0;i<81;i++)
      btn[i].setBackground(null);
  }
  private int next_val(int temp,int val)
  {
    boolean num[] = {false,false,false,false,false,false,false,false,false,false};
    int ia;
    for(int i=0;i<9;i++)
    {
      ia=temp/9*9+i;
      if(btn[ia].getActionCommand().length()>2)num[getVal(ia)]=true;
      ia=i*9+temp%9;
      if(btn[ia].getActionCommand().length()>2)num[getVal(ia)]=true;
      ia= temp/27*27 + temp%9/3*3 + i/3*9 + i%3 ;
      if(btn[ia].getActionCommand().length()>2)num[getVal(ia)]=true;
    }
    for(int i=val+1;i<10;i++)  
      if(!num[i])return i;
    return 0;
  }
  private int getVal(int temp)
  {
    if(!(btn[temp].getText().equals("")))           
      return Integer.parseInt(btn[temp].getText());   // 若該按鈕有文字則將該string用int 傳回
    return 0;                                         // 否則傳回0
  }
  private void setVal(int temp,int val)
  {
    if(val!=0)btn[temp].setText(""+val);
    else btn[temp].setText("");
  }
  private class GameAction implements ActionListener
  {
    public void actionPerformed(ActionEvent e)
    {
      int index = Integer.parseInt(e.getActionCommand());
      if(index>99)return;
      index %= 100;
      int val = getVal(index);
      if( designbtn.getText().equals("Design") ) // 開始設計了，將按鈕變成 Save
      {
        designbtn.setText("Save");
        designbtn.setActionCommand("Save");
      }
      if( designbtn.getText().equals("Save")) // 設計功能下，沒有辦法按下 New
        val=(val+1)%10;
      else if( designbtn.getText().equals("New"))
        val=next_val(index,val);  //  可替換成搜尋函式
      setVal(index,val);
      check();
      if(win==1)
      {
        JOptionPane.showMessageDialog(null,"恭喜你解開這個數獨啦!!\n你可以按 New 進行設計新的題目\n或按 Load 來讀取"+filename.getText());
      }
    }
  }
  private class FileAction implements ActionListener
  {
    public void actionPerformed(ActionEvent e)
    {
      if(e.getActionCommand().equals("Load"))
      {
        Scanner fin = null;
        try
        {
          fin = new Scanner(new FileInputStream( filename.getText() ));
        }
        catch(Exception error)
        {
          JOptionPane.showMessageDialog(null,"無法讀取 "+filename.getText()+"\n請確認該檔案是否存在。");
          clear_btn();
          return ;
        }
        if( !(designbtn.getText().equals("Design")) &&
          win != 1 &&
          JOptionPane.showConfirmDialog(null,
          "目前的遊戲進度將會被覆蓋，是否繼續?",
          "檔案讀取",
          JOptionPane.YES_NO_OPTION) != JOptionPane.YES_OPTION) return;
        for(int i=0;i<81 && fin.hasNextInt();i++)
        {
          int val = fin.nextInt();
          if(val!=0)
          {
            btn[i].setText(""+val);
            btn[i].setActionCommand(""+(i+100));
          }
          else
          {
            btn[i].setText("");
            btn[i].setActionCommand(""+i);
          }
        }
        fin.close();
        win = 0;
        check();
        if(win==-1)JOptionPane.showMessageDialog(null,"讀入的題目不符數獨規則，\n請手動在該檔案內更改完成後重新讀入。");
        else if(win==1)JOptionPane.showMessageDialog(null,filename.getText()+" 內的題目已經獲勝。");
        designbtn.setText("New");
        designbtn.setActionCommand("New");
      }
      else if(e.getActionCommand().equals("Save"))
      {
        if(win==-1)JOptionPane.showMessageDialog(null,"目前設計的題目不符數獨規則，\n請在紅色色塊處更改完成後再按 Save。");
        else if(win==1)JOptionPane.showMessageDialog(null,"目前設計的題目已經獲勝，無法儲存為題目。");
        if(win!=0)return;
        PrintWriter fout = null;
        try
        {
          fout = new PrintWriter(new FileOutputStream( filename.getText() ));
        }
        catch(Exception error)
        {
          filename.setText("Can Read The File.");
          return;
        }
        if( JOptionPane.showConfirmDialog(null,
          filename.getText()+" 將會被覆蓋，是否繼續?",
          "盤面設計儲存",
          JOptionPane.YES_NO_OPTION) != JOptionPane.YES_OPTION) return;
        for(int i=0;i<81;i++)
        {
          int val=getVal(i);
          fout.printf("%4d",val);
          if(i%9==8)fout.println();
          else fout.print(" ");
        }
        fout.close();
        clear_btn();
      }
      else if(e.getActionCommand().equals("New"))
      {
        if( win != 1 &&
          JOptionPane.showConfirmDialog(null,
          "遊戲盤面將會被清空，是否繼續?",
          "開新遊戲",
          JOptionPane.YES_NO_OPTION) != JOptionPane.YES_OPTION) return;
        clear_btn();
      }
      else if(e.getActionCommand().equals("Design"))
      {
        designbtn.setText("Design");
        designbtn.setActionCommand("Design");
        JOptionPane.showMessageDialog(null,"現在可以進行數獨的題目設計，設計完後請按 Save。\n若想開始遊戲請輸入正確的檔名之後按下 Load。");
      }
    }
  }
}
```
