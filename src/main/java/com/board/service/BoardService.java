/*
 * 작성자 : 강현욱
 * 작성일 : 2021.10.14
 */

package com.board.service;

import com.board.entity.Board;
import com.board.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Service //컨트롤러에서 이용함
public class BoardService {

    @Autowired //자바는 new를 쓰지만 Autowired를 쓰면 스프링빈이 알아서 읽어와서 주입을 해줌
    private BoardRepository boardRepository;

    //글 작성 처리
    public void write(Board board, MultipartFile file) throws Exception{

        //저장할 경로 지정
        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\front\\files";

        UUID uuid = UUID.randomUUID();

        String fileName = uuid + "_" + file.getOriginalFilename();

        //파일클래스를 이용해서 빈 껍데기 생성
        File saveFile = new File(projectPath, fileName);

        file.transferTo(saveFile);

        board.setFilename(fileName);
        board.setFilepath("/files/" + fileName);

        this.boardRepository.save(board); //save 안에 엔터티를 넣어준다.
    }

    //게시글 리스트 처리
    public List<Board> boardList() {

        return this.boardRepository.findAll();
    }

    //특정 게시글 불러오기
    public Board boardView(Integer id) { //findById는 Integer를 넣어줘야 하고, int인 id를 받아주기 위해 Integer id작성

        return this.boardRepository.findById(id).get();
    }

    //특정 게시글 삭제
    public void boardDelete(Integer id) {

        this.boardRepository.deleteById(id);
    }

}
