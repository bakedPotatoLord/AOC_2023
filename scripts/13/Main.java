import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files
import java.util.ArrayList;
import java.util.Arrays;


class Main {
	public static void main(String[] args) {
		String raw ="";

		try {
			File myObj = new File("input.txt");
			Scanner myReader = new Scanner(myObj);
			while (myReader.hasNextLine()) {
				String data = myReader.nextLine();
				raw+=data+"\n";
			}
			myReader.close();
		} catch (FileNotFoundException e) {
			System.out.println("An error occurred.");
			e.printStackTrace();
		}

		String[] split = raw.split("\n\n");
		int rows = 0;
		int cols = 0;
		int rows2 = 0;
		int cols2 = 0;

		for(var s : split){
			//make matrix
			var mx = makeMuscularMen(s);
			//find rows
			var reflectionRow = findReflectionRow(mx);
			var reflectionCol = findReflectionRow(pinwheel(mx));;

			var reflectionRow2 = findReflectionRow2(mx);
			var reflectionCol2 = findReflectionRow2(pinwheel(mx));;

			if(reflectionRow != -1){
				//if reflection row exists
				rows += reflectionRow;
			}else if(reflectionCol != -1){
				cols += reflectionCol;
			}
			if(reflectionRow2 != -1){
				//if reflection row exists
				rows2 += reflectionRow2;
			}else if(reflectionCol2 != -1){
				cols2 += reflectionCol2;
			}

			if(reflectionRow2 != -1 && reflectionCol2 != -1){
				System.out.println(printMatrix(mx));
				System.out.println("found reflection at row: "+reflectionRow+" col: "+reflectionCol);
				throw new Error("2 reflections found! OH SHIT...");
			}
		}
		//summary: number of columns left of vertical line + (100 * number of rows above vertical line)
		System.out.println( "part 1: "+ (rows*100 + cols) );
		System.out.println( "part 2: "+ (rows2*100 + cols2) );


		// String first = split[0];
		// String second = split[1];
		// System.out.println("///////////////////////////////////////////////////////////");
		// char[][] m1 = makeMuscularMen(first); 
		// System.out.println(printMatrix(m1));
		// System.out.println();

		// //Matricies
		// var reflectionCol = findReflectionRow(pinwheel(m1));
		// var col2 = findReflectionRow2(m1);
		// System.out.println("found column: "+reflectionCol);
		// System.out.println("found column: "+col2);
		// System.out.println("///////////////////////////////////////////////////////////");

		// char[][] m2 = makeMuscularMen(second);
		// var reflectionRow = findReflectionRow(m2);
		// System.out.println(printMatrix(m2));
		// System.out.println("found row: "+reflectionRow);
		// System.out.println("found row: "+row2);
	}

	//method to make a matrix from a string
	static char[][] makeMuscularMen(String s){
		String[] split = s.split("\n");
		char[][] matrix = new char[split.length][split[0].length()];
		for(int i = 0; i < split.length; i++){
			for(int j = 0; j < split[i].length(); j++){
				matrix[i][j] = split[i].charAt(j);
			}
		}
		return matrix;
	}

	//method to print a matrix
	static String printMatrix(char[][] matrix){
		String temp = "";
		for(var line: matrix){
			for(var c: line){
				temp+=c;
			}
			temp+="\n";
		}
		return temp;
	}



	static char[][] pinwheel(char[][] DD){
		char[][] men = new char[DD[0].length][DD.length];
		for(int i = 0; i < DD.length; i++){
			for(int j = 0; j < DD[i].length; j++){
				men[j][i] = DD[i][j];
			}
		}
		return men;
	}

	static int findReflectionRow(char[][] matrix){
		//iterate over every pair of rows
		for(var i = 1;i<matrix.length;i++){
			var initialIndex = i;
			var top = i-1;
			var bottom = i;
			//at least these two are reflections
			while(true){
				//check if top and bottom are reflections
				if(isSame(matrix[top],matrix[bottom])){
					//if they are, expand outward
					if(top==0 || bottom == matrix.length -1){
						//if at at top or bottom, return initialIndexes
						return initialIndex;
					}
					top--;
					bottom++;
				}else{
					break;
				}
			}
		}
		return -1;
	}

	static int findReflectionRow2(char[][] matrix){
		//iterate over every pair of rows
		for(var i = 1;i<matrix.length;i++){
			var initialIndex = i;
			var top = i-1;
			var bottom = i;

			var smudgeUsed = false;
			
			//at least these two are reflections
			while(true){
				//check if top and bottom are reflections

				var sameness = roughSame(matrix[top], matrix[bottom]);
				if(sameness == 1){
					if(smudgeUsed) break;
					else smudgeUsed = true;
				} 
				if(sameness == 0) break;
				else{
						//if at at top or bottom, 
					if(top==0 || bottom == matrix.length -1){
						//if smudge hasn't been used
						if(!smudgeUsed) break;
						//else return initialIndexes
						else return initialIndex;
					}
					// expand outward
					top--;
					bottom++;
				}
			}
		}
		return -1;
	}


	static boolean isSame(char[] c1, char[] c𝟤){
		return (new String(c1)).equals((new String(c𝟤)));
	}
	
	//0 = 2+ diffs ; 1= 1 diffs ; 2= no difs
	static int roughSame(char[] c1, char[] c2){
		var smudgeUsed = false;
		for(var i = 0; i < c1.length; i++){
			if(c1[i] == c2[i]){
				continue;
			}else if(c1[i] != c2[i]){
				//if not equal
				if(smudgeUsed)return 0;
				else smudgeUsed = true;

			}
		}
		return smudgeUsed ? 1 : 2;
	}
}