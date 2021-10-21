/*
* 작성자 : 강현욱
* 작성일 : 2021.10.14
*/

package com.board.controller;

import com.board.entity.Board;
import com.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/board/write") //어떤 url로 접근할 것인지 접근 -> localhost:8080/board/write 여기로 접근하면 boardWrite html을 보여줌
    public String boardWriteForm(){

        return "boardWrite"; //"어떤 HTML 파일로 보내줄 건지 입력"
    }

    @PostMapping("/board/writepro")
    public String boardWritePro(Board board){

        this.boardService.write(board);

        return "";
    }
    @GetMapping("/board/list")
    public String boardList(Model model) {

        model.addAttribute("list", this.boardService.boardList());

        return "boardlist";
    }

    @GetMapping("/board/view") //localhost:8080/board/view?id=1
    public String boardView(Model model, Integer id){

        model.addAttribute("board", this.boardService.boardView(id));
        return "boardview";
    }

    @GetMapping("/board/delete")
    public String boardDelete(Integer id){

        this.boardService.boardDelete(id);

        return "redirect:/board/list";
    }

    @GetMapping("/board/modify/{id}")
    public String boardModify(@PathVariable("id") Integer id, Model model){

        model.addAttribute("board", this.boardService.boardView(id));

        return "boardmodify";
    }

    @PostMapping("/board/update/{id}")

    public String boardUpdate(@PathVariable("id") Integer id, Board board){

        Board boardTemp = this.boardService.boardView(id);
        boardTemp.setTitle(board.getTitle());
        boardTemp.setContent(board.getContent());

        this.boardService.write(boardTemp);

        return "redirect:/board/list";
    }
}
