#include <iostream>
#include <string>
using namespace std;

class cseMAP {
private:
    int map[3][3];
    int _initialPlace;
    int _pathValue;
    int rowChange[4] = {0, 0, -1, 1};
    int colChange[4] = {-1, 1, 0, 0};

public:
    cseMAP() {}

    cseMAP(int initialPLace) {
        _initialPlace = initialPLace;


        int val = 1;
        for(int i=0; i<3; i++) {
            for(int j=0; j<3; j++) {
                map[i][j] = val++;
            }
        }
        _pathValue = 0;
    }

    void findPathValue(const string path) {

        int row = 1;
        int col = 1;


        _pathValue = map[row][col];

        for(char move : path) {
            int dir = move - '1';

            row = (row + rowChange[dir] + 3) % 3;
            col = (col + colChange[dir] + 3) % 3;
            _pathValue += map[row][col];
        }
    }

    int getPathValue() {
        return _pathValue;
    }
};

int main() {
    cseMAP mapSolution1(5), mapSolution2(5);
    string path1= "333342141211313444411113334211324222144331122344223124413243411321333122222113122414242234421442123324424432221312122421224331332413432334314234321114343234442142321412323231131222324411342331223132312444312214321413214313232413241141441412111311224221143324413423432143243222234422314433312231334313";
    string path2= "113411123144311114113111121333224334212221141111141314321423323334212321323444232312224123234442444222443314441214414424314111432214322134444423424333242212232342114422431234411213412214142421343322444434123224141111231311111214334142333223231324221323343113233431242222234332314321313343113232413113";

    mapSolution1.findPathValue(path1);
    mapSolution2.findPathValue(path2);

    cout << "Path1 value: " << mapSolution1.getPathValue() << endl;
    cout << "Path2 value: " << mapSolution2.getPathValue() << endl;

    return 0;
}
