import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Importance } from "./importance.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { ImportanceDto } from "./dto/importance.dto";
import { ReturnImportanceDto } from "./dto/return-importance.dto";

@Injectable()
export class ImportanceService {
  constructor(
    @InjectRepository(Importance)
    private importanceRepository: Repository<Importance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserImportance(id: number): Promise<Importance[]> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const importance: Importance[] = await this.importanceRepository.findBy({
      user: {
        id: user.id,
      },
    });
    return importance;
  }

  async createDefaultImportance(id: number) {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    let titles: string[] = [
      "건물 대출/융자",
      "전입신고 가능 여부/날짜",
      "계약기간",
      "입주 날짜",
      "중개 수수료",
      "법적 주거형태(보류)",
      "건물 엘레베이터 유무",
      "층수",
      "베란다",
      "다용도 실",
      "건물 준공년도",
      "건물 위치에 따른 대로변 소음",
      "주차",
      "건물에 음식점 존재 유무",
      "벌레 유무",
      "분리수거 방법",
      "음식물 쓰레기 처리 방법",
      "차를 이용하는 시간대 교통 혼잡도",
      "주변 소음 유발 시설(ex. 술집, 고기집) 유무",
      "인근 편의시설(편의점, 마트, 배민, 세탁방)",
      "층간 소음",
      "옆집 소음",
      "주변 가로등 밝기",
      "가까운 지하철 역",
      "가까운 버스정류장",
      "세면대 수압",
      "변기물 수압",
      "세면대 배수구 물빠짐",
      "화장실 배수구 물빠짐",
      "화장실 내 창문",
      "화장실 내 환풍기",
      "화장실 배수구 냄새",
      "화장실 내 곰팡이",
      "녹물 확인",
      "샤워기 수압",
      "온수가 바로 나오는지",
      "싱크대 수압",
      "싱크대 배수구 물빠짐",
      "싱크대 배수구 냄새",
      "싱크대 녹물",
      "부엌 환기",
      "싱크대 아래 냄새",
      "냉장고 옵션",
      "보일러 방식",
      "침대",
      "옷장",
      "장롱",
      "TV",
      "에어컨",
      "인덕션",
      "신발장",
      "건물 입구 인터폰",
      "도어락",
      "이중 잠금 장치",
      "방범창 존재 유무, 튼튼한지?",
      "방충망 찢어진 곳 확인",
      "건물 내부 CCTV",
      "건물 외부 CCTV",
      "이중창 존재 유무",
      "벽지 곰팡이 확인",
      "바닥 파손 확인",
      "창의 방향(ex.남향)",
      "채광",
      "환기",
      "콘센트 위치",
      "외풍",
      "창문이 잘 열리고 닫히는지",
      "방의 냄새",
      "방 위치에 따른 엘레베이터 현관 소음",
      "수납 공간",
    ];
    titles.sort();

    for await (const title of titles) {
      const importance: Importance = this.importanceRepository.create({
        title,
        user,
      });
      await importance.save();
    }
  }

  async editUserImportance(
    id: number,
    importanceDtoList: ImportanceDto[],
  ): Promise<ReturnImportanceDto[]> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    const returnImportanceDto: ReturnImportanceDto[] = [];
    for await (const importanceDto of importanceDtoList) {
      let importance: Importance;
      if (importanceDto.id === 0) {
        importance = this.importanceRepository.create({
          title: importanceDto.title,
          rating: importanceDto.rating,
          user,
        });
      } else {
        importance = await this.importanceRepository.findOne({
          where: { id: importanceDto.id },
          relations: ["user"],
        });
        if (!importance) throw new NotFoundException();
        importance.title = importanceDto.title;
        importance.rating = importanceDto.rating;
      }
      await importance.save();
      returnImportanceDto.push(new ReturnImportanceDto(importance));
    }
    returnImportanceDto.sort((a, b) => a.rating - b.rating);
    return returnImportanceDto;
  }

  async deleteUserImportance(
    id: number,
    importanceId: number,
  ): Promise<{ isSuccess: boolean }> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const importance: Importance = await this.importanceRepository.findOneById(
      importanceId,
    );
    if (!importance)
      throw new NotFoundException(`삭제할 importance를 찾을 수 없음`);
    await this.importanceRepository.remove(importance);
    return { isSuccess: true };
  }
}
