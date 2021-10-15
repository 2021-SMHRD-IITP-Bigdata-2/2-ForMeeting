/*
 * 작성자 : 강현욱
 * 작성일 : 2021.10.14
 */

package com.board.service;

import com.board.entity.Board;
import com.board.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //컨트롤러에서 이용함
public class BoardService {

    @Autowired //자바는 new를 쓰지만 Autowired를 쓰면 스프링빈이 알아서 해줌
    private BoardRepository boardRepository;

    //글 작성 처리
    public void write(Board board){

        this.boardRepository.save(board);
    }

    //게시글 리스트 처리
    public List<Board> boardList(){

        return this.boardRepository.findAll();
    }

    //특정 게시글 불러오기
    public Board boardView(Integer id){

        return this.boardRepository.findById(id).get();
    }

    //특정 게시글 삭제
    public void boardDelete(Integer id){

        this.boardRepository.deleteById(id);
    }
}
